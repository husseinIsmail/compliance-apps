import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from 'shared/src/mockApi/server';
import { CaseListView } from './CaseListView';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderCaseListView = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CaseListView />
    </QueryClientProvider>,
  );
};

describe('CaseListView', () => {
  it('shows the Cases heading and table once data loads', async () => {
    server.use(
      http.get('/api/users', () =>
        HttpResponse.json([
          { identifier: 'user-1', name: 'Alice', active: true },
        ]),
      ),
      http.get('/api/cases', () =>
        HttpResponse.json({
          cases: [
            {
              identifier: 'case-1',
              assignee_id: 'user-1',
              status: 'CASE_NOT_STARTED',
              name: 'Case One',
            },
          ],
          total_count: 1,
          first: '',
          next: '',
          prev: '',
          self: '',
        }),
      ),
    );

    renderCaseListView();

    await waitFor(() => {
      screen.getByRole('heading', { level: 2, name: 'Cases' });
    });

    expect(screen.getByText('Case One')).toBeInTheDocument();
  });

  it('renders an error state when the cases request fails', async () => {
    server.use(
      http.get('/api/users', () => HttpResponse.json([])),
      http.get('/api/cases', () => HttpResponse.error()),
    );

    renderCaseListView();

    await waitFor(() => {
      expect(
        screen.getByText('Error occurred while fetching data.'),
      ).toBeInTheDocument();
    });
  });

  it('renders an error state when the users request fails', async () => {
    server.use(
      http.get('/api/users', () => HttpResponse.error()),
      http.get('/api/cases', () =>
        HttpResponse.json({
          cases: [],
          total_count: 0,
          first: '',
          next: '',
          prev: '',
          self: '',
        }),
      ),
    );

    renderCaseListView();

    await waitFor(() => {
      expect(
        screen.getByText('Error occurred while fetching data.'),
      ).toBeInTheDocument();
    });
  });
});
