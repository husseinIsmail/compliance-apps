import { cases } from './cases';
import { server } from './server';

vi.mock('./cases', () => ({
  cases: new Array(50).fill(undefined).map((_, index) => ({
    identifier: `case-${index + 1}`,
    assignee_id: `user-${index % 5}`,
    status: 'CASE_NOT_STARTED',
    name: `Case ${index + 1}`,
  })),
}));

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const fetchCases = async (query: string) => {
  const response = await fetch(`${location.origin}/api/cases${query}`);
  return response.json();
};

describe('cases handler', () => {
  describe('when there are 50 cases', () => {
    describe('when page is 1 and size is 20', () => {
      it('returns cases 1-20', async () => {
        const body = await fetchCases('?page_number=1&page_size=20');

        expect(body).toEqual({
          cases: cases.slice(0, 20),
          first: '/api/cases?page_number=1&page_size=20',
          next: '/api/cases?page_number=2&page_size=20',
          prev: '',
          self: '/api/cases?page_number=1&page_size=20',
          total_count: 50,
        });
      });
    });

    describe('when page is 2 and size is 20', () => {
      it('returns cases 21-40', async () => {
        const body = await fetchCases('?page_number=2&page_size=20');

        expect(body).toEqual({
          cases: cases.slice(20, 40),
          first: '/api/cases?page_number=1&page_size=20',
          next: '/api/cases?page_number=3&page_size=20',
          prev: '/api/cases?page_number=1&page_size=20',
          self: '/api/cases?page_number=2&page_size=20',
          total_count: 50,
        });
      });
    });

    describe('when page is 3 and size is 20', () => {
      it('returns cases 41-50', async () => {
        const body = await fetchCases('?page_number=3&page_size=20');

        expect(body).toEqual({
          cases: cases.slice(40, 50),
          first: '/api/cases?page_number=1&page_size=20',
          next: '',
          prev: '/api/cases?page_number=2&page_size=20',
          self: '/api/cases?page_number=3&page_size=20',
          total_count: 50,
        });
      });
    });

    describe('when page is 5 and size is 10', () => {
      it('returns cases 41-50', async () => {
        const body = await fetchCases('?page_number=5&page_size=10');

        expect(body).toEqual({
          cases: cases.slice(40, 50),
          first: '/api/cases?page_number=1&page_size=10',
          next: '',
          prev: '/api/cases?page_number=4&page_size=10',
          self: '/api/cases?page_number=5&page_size=10',
          total_count: 50,
        });
      });
    });

    describe('when page is 1 and size is 50', () => {
      it('returns cases 1-50', async () => {
        const body = await fetchCases('?page_number=1&page_size=50');

        expect(body).toEqual({
          cases: cases.slice(0, 50),
          first: '/api/cases?page_number=1&page_size=50',
          next: '',
          prev: '',
          self: '/api/cases?page_number=1&page_size=50',
          total_count: 50,
        });
      });
    });

    describe('when page is 1 and size is 51', () => {
      it('returns cases 1-50', async () => {
        const body = await fetchCases('?page_number=1&page_size=51');

        expect(body).toEqual({
          cases: cases.slice(0, 50),
          first: '/api/cases?page_number=1&page_size=51',
          next: '',
          prev: '',
          self: '/api/cases?page_number=1&page_size=51',
          total_count: 50,
        });
      });
    });

    describe('when page number is beyond end of data', () => {
      it('returns no cases', async () => {
        const body = await fetchCases('?page_number=100&page_size=20');

        expect(body).toEqual({
          cases: [],
          first: '',
          next: '',
          prev: '',
          self: '',
          total_count: 0,
        });
      });
    });

    describe('when params not provided', () => {
      it('defaults to page 1, size 25', async () => {
        const body = await fetchCases('');

        expect(body).toEqual({
          cases: cases.slice(0, 25),
          first: '/api/cases?page_number=1&page_size=25',
          next: '/api/cases?page_number=2&page_size=25',
          prev: '',
          self: '/api/cases?page_number=1&page_size=25',
          total_count: 50,
        });
      });
    });
  });

  describe('when filtering by assignee_id', () => {
    describe('when the filtered set spans multiple pages', () => {
      it('paginates within the filtered set and preserves assignee_id on the next link', async () => {
        const body = await fetchCases(
          '?page_number=1&page_size=4&assignee_id=user-0',
        );

        const expectedCases = cases
          .filter((c) => c.assignee_id === 'user-0')
          .slice(0, 4);

        expect(body).toEqual({
          cases: expectedCases,
          first: '/api/cases?page_number=1&page_size=4&assignee_id=user-0',
          next: '/api/cases?page_number=2&page_size=4&assignee_id=user-0',
          prev: '',
          self: '/api/cases?page_number=1&page_size=4&assignee_id=user-0',
          total_count: 10,
        });
      });

      it('preserves assignee_id on both next and prev links from a middle page', async () => {
        const body = await fetchCases(
          '?page_number=2&page_size=4&assignee_id=user-0',
        );

        const expectedCases = cases
          .filter((c) => c.assignee_id === 'user-0')
          .slice(4, 8);

        expect(body).toEqual({
          cases: expectedCases,
          first: '/api/cases?page_number=1&page_size=4&assignee_id=user-0',
          next: '/api/cases?page_number=3&page_size=4&assignee_id=user-0',
          prev: '/api/cases?page_number=1&page_size=4&assignee_id=user-0',
          self: '/api/cases?page_number=2&page_size=4&assignee_id=user-0',
          total_count: 10,
        });
      });
    });

    it('returns an empty result for an assignee_id that matches no cases', async () => {
      const body = await fetchCases(
        '?page_number=1&page_size=25&assignee_id=nonexistent-user',
      );

      expect(body).toEqual({
        cases: [],
        first: '',
        next: '',
        prev: '',
        self: '',
        total_count: 0,
      });
    });

    it('ignores a blank/whitespace-only assignee_id and returns all cases', async () => {
      const body = await fetchCases(
        '?page_number=1&page_size=50&assignee_id=%20',
      );

      expect(body).toEqual({
        cases: cases.slice(0, 50),
        first: '/api/cases?page_number=1&page_size=50',
        next: '',
        prev: '',
        self: '/api/cases?page_number=1&page_size=50',
        total_count: 50,
      });
    });
  });
});
