import {
  VariablesReducerState,
  VariablesListingRequestPayload,
  VariablesListingSuccessPayload,
  VariablesListingFailurePayload,
  VariablesListingAction
} from './types';
import {
  updateList,
  setRequesting,
  setFailure,
  getEmptyListResults,
  TapisListResults
} from 'tapis-redux/types/results'
import { TAPIS_DEFAULT_VARIABLES_LISTING_LIMIT } from 'tapis-redux/constants/tapis';
import * as ACTIONS from './actionTypes';
import { Streams } from "@tapis/tapis-typescript";


const emptyResults = getEmptyListResults(TAPIS_DEFAULT_VARIABLES_LISTING_LIMIT);

export const initialState: VariablesReducerState = {};

const variableMapCheck = (variables: VariablesReducerState, projectId: string, siteId: string, instrumentId: string): VariablesReducerState => {
  const result: VariablesReducerState = {...variables};
  if(!(projectId in result)) {
    result[projectId] = {};
  }
  if(!(siteId in result[projectId])) {
    result[projectId][siteId] = {};
  }
  if(!(instrumentId in result[projectId][siteId])) {
    result[projectId][siteId][instrumentId] = {...emptyResults};
  }
  return result;
}

const setListingRequest = (variables: VariablesReducerState, payload: VariablesListingRequestPayload): VariablesReducerState => {
  const {projectUuid, siteId, instId} = payload.params;
  const result = variableMapCheck(variables, projectUuid, siteId, instId);
  result[projectUuid][siteId][instId] = setRequesting<Streams.Variable>(result[projectUuid][siteId][instId]);
  return result;
} 

const setListingSuccess = (variables: VariablesReducerState, payload: VariablesListingSuccessPayload): VariablesReducerState => {
  const { projectUuid, siteId, instId, offset, limit } = payload.params;
  const { incoming } = payload;
  const result: VariablesReducerState = variableMapCheck(variables, projectUuid, siteId, instId);
  result[projectUuid][siteId][instId] = updateList<Streams.Variable>(result[projectUuid][siteId][instId], incoming, offset, limit, TAPIS_DEFAULT_VARIABLES_LISTING_LIMIT);
  return result;
}

const setListingFailure = (variables: VariablesReducerState, payload: VariablesListingFailurePayload): VariablesReducerState => {
  const { projectUuid, siteId, instId } = payload.params;
  const { error } = payload;
  const result: VariablesReducerState = variableMapCheck(variables, projectUuid, siteId, instId);
  result[projectUuid][siteId][instId] = setFailure<Streams.Variable>(result[projectUuid][siteId][instId], error);
  return result;
}

export function variables(state: VariablesReducerState = initialState, action: VariablesListingAction): VariablesReducerState {
  switch (action.type) {
    case ACTIONS.TAPIS_VARIABLES_LIST_REQUEST:
      return {
        ...state,
        ...setListingRequest(state, action.payload)
      };
    case ACTIONS.TAPIS_VARIABLES_LIST_SUCCESS:
      return {
        ...state,
        ...setListingSuccess(state, action.payload)
      };
    case ACTIONS.TAPIS_VARIABLES_LIST_FAILURE:
      return {
        ...state,
        ...setListingFailure(state, action.payload)
      };
    default:
      return state;
  }
}