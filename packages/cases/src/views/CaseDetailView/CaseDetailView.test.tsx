import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { server } from 'shared/src/mockApi/server';
import { CaseDetailView } from './CaseDetailView';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderCaseDetailView = (caseId: string) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const router = createMemoryRouter(
    [{ path: '/cases/:caseId', element: <CaseDetailView /> }],
    { initialEntries: [`/cases/${caseId}`] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

describe('CaseDetailView', () => {
  it('shows the case name, status, and assignee once loaded', async () => {
    server.use(
      http.get('/api/users', () =>
        HttpResponse.json([
          { identifier: 'user-1', name: 'Alice', active: true },
        ]),
      ),
      http.get('/api/cases/:id', () =>
        HttpResponse.json({
          identifier: 'case-1',
          assignee_id: 'user-1',
          status: 'CASE_IN_PROGRESS',
          name: 'Case One',
        }),
      ),
    );

    renderCaseDetailView('case-1');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: 'Case' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Case One')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Assignee: Alice')).toBeInTheDocument();
    });
  });

  it('shows an inactive indicator when the assignee is inactive', async () => {
    server.use(
      http.get('/api/users', () =>
        HttpResponse.json([
          { identifier: 'user-1', name: 'Alice', active: false },
        ]),
      ),
      http.get('/api/cases/:id', () =>
        HttpResponse.json({
          identifier: 'case-1',
          assignee_id: 'user-1',
          status: 'CASE_NOT_STARTED',
          name: 'Case One',
        }),
      ),
    );

    renderCaseDetailView('case-1');

    await waitFor(() => {
      expect(
        screen.getByText('Assignee: Alice (inactive)'),
      ).toBeInTheDocument();
    });
  });

  it('renders an error state for a case that does not exist', async () => {
    server.use(
      http.get('/api/users', () => HttpResponse.json([])),
      http.get('/api/cases/:id', () =>
        HttpResponse.json({ message: 'Case not found' }, { status: 404 }),
      ),
    );

    renderCaseDetailView('nonexistent-case');

    await waitFor(() => {
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });
  });
});
