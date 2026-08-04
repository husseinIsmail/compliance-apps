import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from 'shared/src/mockApi/server';
import { useCasesWithAssignee } from './useCasesWithAssignee';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const users = [
  { identifier: 'user-1', name: 'Alice', active: true },
  { identifier: 'user-2', name: 'Bob', active: false },
];

const casesFixture = [
  {
    identifier: 'case-1',
    assignee_id: 'user-1',
    status: 'CASE_NOT_STARTED',
    name: 'Case One',
  },
  {
    identifier: 'case-2',
    assignee_id: 'user-2',
    status: 'CASE_IN_PROGRESS',
    name: 'Case Two',
  },
  {
    identifier: 'case-3',
    assignee_id: 'ghost-user',
    status: 'CASE_ON_HOLD',
    name: 'Case Three',
  },
];

const mockApi = () => {
  server.use(
    http.get('/api/users', () => HttpResponse.json(users)),
    http.get('/api/cases', ({ request }) => {
      const url = new URL(request.url);
      const assigneeId = url.searchParams.get('assignee_id');
      const filtered = assigneeId
        ? casesFixture.filter((c) => c.assignee_id === assigneeId)
        : casesFixture;

      return HttpResponse.json({
        cases: filtered,
        total_count: filtered.length,
        first: '',
        next: '',
        prev: '',
        self: '',
      });
    }),
  );
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCasesWithAssignee', () => {
  it('joins cases with their assignee name and active flag', async () => {
    mockApi();
    const { result } = renderHook(() => useCasesWithAssignee(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([
      expect.objectContaining({
        identifier: 'case-1',
        assignee_name: 'Alice',
        assignee_active: true,
      }),
      expect.objectContaining({
        identifier: 'case-2',
        assignee_name: 'Bob',
        assignee_active: false,
      }),
      expect.objectContaining({
        identifier: 'case-3',
        assignee_name: 'Unknown',
        assignee_active: false,
      }),
    ]);
  });

  it('does not crash when a case references an assignee_id missing from the users list', async () => {
    mockApi();
    const { result } = renderHook(() => useCasesWithAssignee(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    const ghostCase = result.current.data.find(
      (c) => c.identifier === 'case-3',
    );
    expect(ghostCase?.assignee_name).toBe('Unknown');
    expect(ghostCase?.assignee_active).toBe(false);
  });

  it('resets the pagination page to 0 when the assignee filter changes', async () => {
    mockApi();
    const { result } = renderHook(() => useCasesWithAssignee(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      result.current.onPaginationModelChange({ page: 3, pageSize: 25 });
    });
    expect(result.current.paginationModel.page).toBe(3);

    await act(async () => {
      result.current.onAssigneeFilterChange('user-1');
    });

    expect(result.current.paginationModel.page).toBe(0);
    expect(result.current.assigneeFilter).toBe('user-1');
  });
});
