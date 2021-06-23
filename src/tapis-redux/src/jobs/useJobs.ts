import { useSelector } from 'react-redux';
import { list } from './list/actions';
import { TapisState } from '../store/rootReducer';
import { AppsListCallback } from './list/types';
import { Apps } from '@tapis/tapis-typescript';

export interface ListAppsParams {
  onList?: AppsListCallback
}

const useSystems = (config) => {
  const { apps } = useSelector((state: TapisState) => state.apps);
  return {
    apps,
    list: (params: ListAppsParams & Apps.GetAppsRequest) => list(config, params.onList),
  };
};

export default useSystems;
