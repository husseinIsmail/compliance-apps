import { useQuery } from '@tanstack/react-query';

import fetchTyped from '../../utils/fetchTyped';

import { GetCasesResponse } from './types';

export const useGetCasesQuery = () => {
  return useQuery({
    queryKey: ['cases'],
    queryFn: () => fetchTyped<GetCasesResponse>('/api/cases', {}),
  });
};
