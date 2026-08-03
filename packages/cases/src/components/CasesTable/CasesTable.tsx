import Box from '@mui/material/Box';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

import { CaseWithAssignee } from '../../views/CaseListView/types';
import { STATUS_LABELS } from '../../views/CaseListView/consts';

interface CasesTableProps {
  cases: CaseWithAssignee[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  muiTheme: Theme;
}

const columns: GridColDef<CaseWithAssignee>[] = [
  { field: 'name', headerName: 'Name', width: 200, flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    valueFormatter: (value: string) => STATUS_LABELS[value] ?? value,
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
}: CasesTableProps) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ height: 600, width: '100%' }}>
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
