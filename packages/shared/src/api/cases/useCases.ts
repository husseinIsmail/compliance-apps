import { useQuery } from '@tanstack/react-query';

import fetchTyped from '../../utils/fetchTyped';

import { GetCasesResponse } from './types';

export interface GetCasesParams {
  page_number: number;
  page_size: number;
}

export const useGetCasesQuery = ({ page_number, page_size }: GetCasesParams) => {
  return useQuery({
    queryKey: ['cases', page_number, page_size],
    queryFn: () =>
      fetchTyped<GetCasesResponse>(
        `/api/cases?page_number=${page_number}&page_size=${page_size}`,
        {},
      ),
  });
};
