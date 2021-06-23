import { list } from './list/reducer';
import { getEmptyListResults } from 'tapis-redux/types/results';
import { JobsReducerState, JobsAction, JobsReducer } from './types';
import { TAPIS_DEFAULT_JOBS_LISTING_LIMIT } from 'tapis-redux/constants/tapis';

const emptyResults = getEmptyListResults(TAPIS_DEFAULT_JOBS_LISTING_LIMIT);

export const initialState: JobsReducerState = {
  jobs: { ...emptyResults }
};

export function jobs(state: JobsReducerState=initialState, action: JobsAction): JobsReducerState {
  // Apply each of the sub-reducers in sequence
  const reducers: Array<JobsReducer> = [ list ];
  let result = { ...state };
  reducers.forEach(
    (reducer) => {
      result = reducer(result, action)
    }
  );
  return result;
}