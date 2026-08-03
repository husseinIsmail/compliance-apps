import { useQuery } from '@tanstack/react-query';

import fetchTyped from '../../utils/fetchTyped';

import { GetCasesResponse } from './types';

export interface GetCasesParams {
  page_number: number;
  page_size: number;
  assignee_id?: string;
}

export const useGetCasesQuery = ({
  page_number,
  page_size,
  assignee_id,
}: GetCasesParams) => {
  return useQuery({
    queryKey: ['cases', page_number, page_size, assignee_id],
    queryFn: () => {
      const params = new URLSearchParams({
        page_number: String(page_number),
        page_size: String(page_size),
      });
      if (assignee_id) {
        params.set('assignee_id', assignee_id);
      }
      return fetchTyped<GetCasesResponse>(`/api/cases?${params}`, {});
    },
  });
};
