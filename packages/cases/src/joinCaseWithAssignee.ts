import { CasesApi, UsersApi } from 'shared';

import { CaseWithAssignee } from './types';

const buildUsersByIdentifier = (
  users: UsersApi.User[],
): Record<string, UsersApi.User> =>
  Object.fromEntries(users.map((user) => [user.identifier, user]));

const toCaseWithAssignee = (
  caseItem: CasesApi.Case,
  assignee: UsersApi.User | undefined,
): CaseWithAssignee => ({
  ...caseItem,
  assignee_name: assignee?.name ?? 'Unknown',
  assignee_active: assignee?.active ?? false,
});

export const joinCaseWithAssignee = (
  caseItem: CasesApi.Case,
  users: UsersApi.User[],
): CaseWithAssignee => {
  const assignee = users.find(
    (user) => user.identifier === caseItem.assignee_id,
  );

  return toCaseWithAssignee(caseItem, assignee);
};

export const joinCasesWithAssignees = (
  cases: CasesApi.Case[],
  users: UsersApi.User[],
): CaseWithAssignee[] => {
  const usersByIdentifier = buildUsersByIdentifier(users);

  return cases.map((caseItem) =>
    toCaseWithAssignee(caseItem, usersByIdentifier[caseItem.assignee_id]),
  );
};
