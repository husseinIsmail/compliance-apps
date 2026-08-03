import { http, HttpResponse, StrictRequest, DefaultBodyType } from 'msw';
import example from './example.json';
import { users } from './users';
import { cases } from './cases';

import { GetCasesResponse } from '../api/cases';
import { GetUsersResponse } from '../api/users';

export const casesHandler = ({
  request,
}: {
  request: StrictRequest<DefaultBodyType>;
}) => {
  const url = new URL(request.url);

  const page_size = url.searchParams.get('page_size');
  const page_number = url.searchParams.get('page_number');
  const raw_assignee_id = url.searchParams.get('assignee_id');

  const page = parseInt(page_number as string, 10) || 1;
  const size = parseInt(page_size as string, 10) || 25;
  const assignee_id = raw_assignee_id?.trim() || undefined;

  const filteredCases = assignee_id
    ? cases.filter((caseItem) => caseItem.assignee_id === assignee_id)
    : cases;

  const start = (page - 1) * size;

  const assigneeQueryString = assignee_id ? `&assignee_id=${assignee_id}` : '';

  if (start > filteredCases.length - 1) {
    return HttpResponse.json({
      cases: [],
      total_count: 0,
      first: '',
      next: '',
      prev: '',
      self: '',
    });
  }

  const end = start + size;

  const casesArray = filteredCases.slice(start, end);

  const hasNext = end < filteredCases.length;

  return HttpResponse.json({
    cases: casesArray,
    total_count: filteredCases.length,
    first: `/api/cases?page_number=1${assigneeQueryString}`,
    next: hasNext
      ? `/api/cases?page_number=${page + 1}${assigneeQueryString}`
      : '',
    prev:
      page > 1
        ? `/api/cases?page_number=${page - 1}${assigneeQueryString}`
        : '',
    self: `/api/cases?page_number=${page}${assigneeQueryString}`,
  } as GetCasesResponse);
};

export const apiHandlers = [
  http.get('/api/example', () => {
    return HttpResponse.json(example);
  }),

  http.get('/api/users', () => {
    return HttpResponse.json(users as GetUsersResponse);
  }),

  http.get('/api/cases', casesHandler),
];
