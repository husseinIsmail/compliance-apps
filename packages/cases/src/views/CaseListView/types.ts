import { CasesApi } from 'shared';

export type CaseWithAssignee = CasesApi.Case & {
  assignee_name: string;
  active: boolean;
};
