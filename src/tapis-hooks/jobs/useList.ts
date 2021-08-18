import { useQuery } from 'react-query';
import { list } from 'tapis-api/jobs';
import { Jobs } from '@tapis/tapis-typescript'
import { useTapisConfig } from 'tapis-hooks';

const useList = (params: Jobs.GetJobListRequest) => {
  const { accessToken, basePath } = useTapisConfig();
  const result = useQuery<Jobs.RespGetJobList, Error>(
    [params, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => list(params, basePath, accessToken?.access_token || ''),
    {
      enabled: !!accessToken
    }
  );
  return result;
}

export default useList;