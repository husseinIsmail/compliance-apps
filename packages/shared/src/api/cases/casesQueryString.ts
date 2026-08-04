export interface CasesQueryParams {
  page_number: number;
  page_size: number;
  assignee_id?: string;
}

export const buildCasesQueryString = ({
  page_number,
  page_size,
  assignee_id,
}: CasesQueryParams) => {
  const params = new URLSearchParams({
    page_number: String(page_number),
    page_size: String(page_size),
  });

  if (assignee_id) {
    params.set('assignee_id', assignee_id);
  }

  return params.toString();
};
