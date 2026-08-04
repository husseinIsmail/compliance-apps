import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useAssigneeFilter } from './useAssigneeFilter';

describe('useAssigneeFilter', () => {
  it('defaults to null (no filter)', () => {
    const { result } = renderHook(() => useAssigneeFilter());

    expect(result.current.assigneeFilter).toBeNull();
  });

  it('updates the filter via setAssigneeFilter', async () => {
    const { result } = renderHook(() => useAssigneeFilter());

    await act(async () => {
      result.current.setAssigneeFilter('user-1');
    });

    expect(result.current.assigneeFilter).toBe('user-1');
  });
});
