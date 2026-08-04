import { useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';

const DEFAULT_PAGINATION_MODEL: GridPaginationModel = {
  page: 0,
  pageSize: 25,
};

export const usePaginationModel = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
    DEFAULT_PAGINATION_MODEL,
  );

  const resetPage = () => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  return { paginationModel, setPaginationModel, resetPage };
};
