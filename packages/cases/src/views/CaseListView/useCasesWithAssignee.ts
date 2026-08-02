import { useMemo } from 'react';
import { CasesApi, UsersApi } from 'shared';

export const useCasesWithAssignee = () => {
  const casesQuery = CasesApi.useGetCasesQuery();
  const usersQuery = UsersApi.useGetUsersQuery();

  const data = useMemo(() => {
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
  };
};
