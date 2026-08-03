import { useMemo, useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import { CasesApi, UsersApi } from 'shared';

import { CaseWithAssignee } from './types';

const DEFAULT_PAGINATION_MODEL: GridPaginationModel = {
  page: 0,
  pageSize: 25,
};

export const useCasesWithAssignee = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
    DEFAULT_PAGINATION_MODEL,
  );

  const casesQuery = CasesApi.useGetCasesQuery({
    page_number: paginationModel.page + 1,
    page_size: paginationModel.pageSize,
  });
  const usersQuery = UsersApi.useGetUsersQuery();

  const data = useMemo<CaseWithAssignee[]>(() => {
    if (!casesQuery.data || !usersQuery.data) {
      return [];
    }

    const userMap = Object.fromEntries(
      usersQuery.data.map((user) => [
        user.identifier,
        { name: user.name, active: user.active },
      ]),
    );

    return casesQuery.data.cases.map((caseItem) => ({
      ...caseItem,
      assignee_name: userMap[caseItem.assignee_id].name ?? 'Unknown',
      active: userMap[caseItem.assignee_id].active ?? false,
    }));
  }, [casesQuery.data, usersQuery.data]);

  return {
    data,
    isLoading: casesQuery.isLoading || usersQuery.isLoading,
    isError: casesQuery.isError || usersQuery.isError,
    error: casesQuery.error ?? usersQuery.error,
    rowCount: casesQuery.data?.total_count ?? 0,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
  };
};
