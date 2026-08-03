import { http, HttpResponse, StrictRequest, DefaultBodyType } from 'msw';
import example from './example.json';
import { users } from './users';
import { cases } from './cases';

import { GetCasesResponse, buildCasesQueryString } from '../api/cases';

export const casesHandler = ({
  request,
}: {
  request: StrictRequest<DefaultBodyType>;
}) => {
  const url = new URL(request.url);

  const page_size = url.searchParams.get('page_size');
  const page_number = url.searchParams.get('page_number');
  const raw_assignee_id = url.searchParams.get('assignee_id');

  const page = Math.max(1, parseInt(page_number as string, 10) || 1);
  const size = Math.max(1, parseInt(page_size as string, 10) || 25);
  const assignee_id = raw_assignee_id?.trim() || undefined;

  const filteredCases = assignee_id
    ? cases.filter((caseItem) => caseItem.assignee_id === assignee_id)
    : cases;

  const start = (page - 1) * size;

  const buildLink = (pageNumber: number) =>
    `/api/cases?${buildCasesQueryString({
      page_number: pageNumber,
      page_size: size,
      assignee_id,
    })}`;

  if (start > filteredCases.length - 1) {
    const emptyBody: GetCasesResponse = {
      cases: [],
      total_count: 0,
      first: '',
      next: '',
      prev: '',
      self: '',
    };
    return HttpResponse.json(emptyBody);
  }

  const end = start + size;

  const casesArray = filteredCases.slice(start, end);

  const hasNext = end < filteredCases.length;

  const body: GetCasesResponse = {
    cases: casesArray,
    total_count: filteredCases.length,
    first: buildLink(1),
    next: hasNext ? buildLink(page + 1) : '',
    prev: page > 1 ? buildLink(page - 1) : '',
    self: buildLink(page),
  };

  return HttpResponse.json(body);
};

export const apiHandlers = [
  http.get('/api/example', () => {
    return HttpResponse.json(example);
  }),

  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.get('/api/cases', casesHandler),
];
