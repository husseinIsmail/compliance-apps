import { CasesApi, UsersApi } from 'shared';

import { joinCaseWithAssignee } from '../../joinCaseWithAssignee';

export const useCaseWithAssignee = (caseId: string) => {
  const caseQuery = CasesApi.useGetCaseQuery(caseId);
  const usersQuery = UsersApi.useGetUsersQuery();

  const data =
    caseQuery.data && usersQuery.data
      ? joinCaseWithAssignee(caseQuery.data, usersQuery.data)
      : undefined;

  return {
    data,
    isLoading: caseQuery.isLoading || usersQuery.isLoading,
    isError: caseQuery.isError || usersQuery.isError,
    error: caseQuery.error ?? usersQuery.error,
  };
};
