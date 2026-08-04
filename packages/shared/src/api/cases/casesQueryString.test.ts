import { buildCasesQueryString } from './casesQueryString';

describe('buildCasesQueryString', () => {
  it('builds page_number and page_size params', () => {
    expect(buildCasesQueryString({ page_number: 2, page_size: 25 })).toBe(
      'page_number=2&page_size=25',
    );
  });

  it('includes assignee_id when provided', () => {
    expect(
      buildCasesQueryString({
        page_number: 1,
        page_size: 10,
        assignee_id: 'user-1',
      }),
    ).toBe('page_number=1&page_size=10&assignee_id=user-1');
  });

  it('omits assignee_id when undefined', () => {
    expect(
      buildCasesQueryString({
        page_number: 1,
        page_size: 10,
        assignee_id: undefined,
      }),
    ).toBe('page_number=1&page_size=10');
  });

  it('omits assignee_id when an empty string', () => {
    expect(
      buildCasesQueryString({
        page_number: 1,
        page_size: 10,
        assignee_id: '',
      }),
    ).toBe('page_number=1&page_size=10');
  });

  it('URL-encodes special characters in assignee_id', () => {
    expect(
      buildCasesQueryString({
        page_number: 1,
        page_size: 10,
        assignee_id: 'user id/with special&chars',
      }),
    ).toBe(
      'page_number=1&page_size=10&assignee_id=user+id%2Fwith+special%26chars',
    );
  });
});
