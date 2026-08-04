import { useQuery } from '@tanstack/react-query';

import fetchTyped from '../../utils/fetchTyped';

import { Case } from './types';

export const useGetCaseQuery = (id: string) => {
  return useQuery({
    queryKey: ['case', id],
    queryFn: () => fetchTyped<Case>(`/api/cases/${id}`, {}),
  });
};
