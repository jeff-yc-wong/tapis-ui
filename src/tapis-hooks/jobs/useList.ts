import { useQuery } from 'react-query';
import { list } from 'tapis-api/jobs';
import { Jobs } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks';
import QueryKeys from './queryKeys';

export const defaultParams: Jobs.GetJobListRequest = {
  orderBy: 'created(desc)',
};

const useList = (params: Jobs.GetJobListRequest = defaultParams) => {
  const { accessToken, basePath } = useTapisConfig();
  const result = useQuery<Jobs.RespGetJobList, Error>(
    [QueryKeys.list, params, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => list(params, basePath, accessToken?.access_token ?? ''),
    {
      enabled: !!accessToken,
    }
  );
  return result;
};

export default useList;
