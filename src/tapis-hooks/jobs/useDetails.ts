import { useQuery } from 'react-query';
import { details } from 'tapis-api/jobs';
import { Jobs } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks';
import QueryKeys from './queryKeys';

const useDetails = (jobUuid: string) => {
  const { accessToken, basePath } = useTapisConfig();
  const params: Jobs.GetJobRequest = { jobUuid };
  const result = useQuery<Jobs.RespGetJob, Error>(
    [QueryKeys.details, params, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => details(params, basePath, accessToken?.access_token ?? ''),
    {
      enabled: !!accessToken,
    }
  );
  return result;
};

export default useDetails;
