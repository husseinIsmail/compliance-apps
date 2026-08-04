import { useMemo } from 'react';
import { CasesApi, UsersApi } from 'shared';

import { CaseWithAssignee } from '../../types';
import { joinCasesWithAssignees } from '../../joinCaseWithAssignee';
import { usePaginationModel } from '../../hooks/usePaginationModel';
import { useAssigneeFilter } from '../../hooks/useAssigneeFilter';

export const useCasesWithAssignee = () => {
  const { paginationModel, setPaginationModel, resetPage } =
    usePaginationModel();
  const { assigneeFilter, setAssigneeFilter } = useAssigneeFilter();

  const handleAssigneeFilterChange = (assigneeId: string | null) => {
    setAssigneeFilter(assigneeId);
    resetPage();
  };

  const handleClearFilters = () => {
    setAssigneeFilter(null);
    resetPage();
  };

  const casesQuery = CasesApi.useGetCasesQuery({
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    assigneeId: assigneeFilter ?? undefined,
  });

  const usersQuery = UsersApi.useGetUsersQuery();

  const data = useMemo<CaseWithAssignee[]>(() => {
    if (!casesQuery.data || !usersQuery.data) {
      return [];
    }

    return joinCasesWithAssignees(casesQuery.data.cases, usersQuery.data);
  }, [casesQuery.data, usersQuery.data]);

  return {
    data,
    isLoading: casesQuery.isLoading || usersQuery.isLoading,
    isError: casesQuery.isError || usersQuery.isError,
    error: casesQuery.error ?? usersQuery.error,
    rowCount: casesQuery.data?.total_count ?? 0,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    assigneeOptions: usersQuery.data ?? [],
    assigneeFilter,
    onAssigneeFilterChange: handleAssigneeFilterChange,
    onClearFilters: handleClearFilters,
  };
};
