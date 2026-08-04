import { useState } from 'react';

export const useAssigneeFilter = () => {
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);

  return { assigneeFilter, setAssigneeFilter };
};
