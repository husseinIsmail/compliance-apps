import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { usePaginationModel } from './usePaginationModel';

describe('usePaginationModel', () => {
  it('defaults to page 0 with a page size of 25', () => {
    const { result } = renderHook(() => usePaginationModel());

    expect(result.current.paginationModel).toEqual({ page: 0, pageSize: 25 });
  });

  it('updates the pagination model via setPaginationModel', async () => {
    const { result } = renderHook(() => usePaginationModel());

    await act(async () => {
      result.current.setPaginationModel({ page: 2, pageSize: 10 });
    });

    expect(result.current.paginationModel).toEqual({ page: 2, pageSize: 10 });
  });

  it('resetPage sets the page back to 0 without touching pageSize', async () => {
    const { result } = renderHook(() => usePaginationModel());

    await act(async () => {
      result.current.setPaginationModel({ page: 3, pageSize: 50 });
    });
    await act(async () => {
      result.current.resetPage();
    });

    expect(result.current.paginationModel).toEqual({ page: 0, pageSize: 50 });
  });
});
