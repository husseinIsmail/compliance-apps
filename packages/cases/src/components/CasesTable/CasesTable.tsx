import Box from '@mui/material/Box';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { UsersApi } from 'shared';

import { CaseWithAssignee } from '../../views/CaseListView/types';
import { STATUS_COLORS, STATUS_LABELS } from '../../views/CaseListView/consts';
import { CasesTableFilters } from './CasesTableFilters';

interface CasesTableProps {
  cases: CaseWithAssignee[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  muiTheme: Theme;
  assigneeOptions: UsersApi.User[];
  assigneeFilter: string | null;
  onAssigneeFilterChange: (assigneeId: string | null) => void;
  onClearFilters: () => void;
}

const columns: GridColDef<CaseWithAssignee>[] = [
  { field: 'name', headerName: 'Name', width: 200, flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    valueFormatter: (value: string) => STATUS_LABELS[value] ?? value,
    renderCell: ({ row }) => (
      <Box
        component="span"
        sx={{ color: STATUS_COLORS[row.status] ?? 'text.primary' }}
      >
        {STATUS_LABELS[row.status] ?? row.status}
      </Box>
    ),
  },
  {
    field: 'assignee_name',
    headerName: 'Assignee',
    width: 180,
    renderCell: ({ row }) => (
      <Box
        component="span"
        sx={{ color: row.active ? 'text.primary' : 'text.disabled' }}
      >
        {row.assignee_name}
      </Box>
    ),
  },
];

export const CasesTable = ({
  cases,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  muiTheme,
  assigneeOptions,
  assigneeFilter,
  onAssigneeFilterChange,
  onClearFilters,
}: CasesTableProps) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ height: 600, width: '100%' }}>
        <CasesTableFilters
          assigneeOptions={assigneeOptions}
          assigneeFilter={assigneeFilter}
          onAssigneeFilterChange={onAssigneeFilterChange}
          onClearFilters={onClearFilters}
        />
        <DataGrid
          rows={cases}
          columns={columns}
          getRowId={(row) => row.identifier}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    </ThemeProvider>
  );
};
