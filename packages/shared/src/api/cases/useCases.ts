import { useQuery } from '@tanstack/react-query';

import fetchTyped from '../../utils/fetchTyped';

import { GetCasesResponse } from './types';
import { buildCasesQueryString } from './casesQueryString';

export interface GetCasesParams {
  pageNumber: number;
  pageSize: number;
  assigneeId?: string;
}

export const useGetCasesQuery = ({
  pageNumber,
  pageSize,
  assigneeId,
}: GetCasesParams) => {
  return useQuery({
    queryKey: ['cases', pageNumber, pageSize, assigneeId],
    queryFn: () => {
      const queryString = buildCasesQueryString({
        page_number: pageNumber,
        page_size: pageSize,
        assignee_id: assigneeId,
      });
      return fetchTyped<GetCasesResponse>(`/api/cases?${queryString}`, {});
    },
  });
};
