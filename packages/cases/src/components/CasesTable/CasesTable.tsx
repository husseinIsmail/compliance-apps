import MuiBox from '@mui/material/Box';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import { CaseWithAssignee } from '../../types';
import { STATUS_COLORS, STATUS_ICONS, STATUS_LABELS } from '../../consts';

interface CasesTableProps {
  cases: CaseWithAssignee[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  muiTheme: Theme;
}

const columns: GridColDef<CaseWithAssignee>[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    flex: 1,
    renderCell: ({ row }) => (
      <MuiBox
        component={Link}
        to={`/cases/${row.identifier}`}
        sx={{
          color: 'info.main',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {row.name}
      </MuiBox>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    valueFormatter: (value: string) => STATUS_LABELS[value] ?? value,
    renderCell: ({ row }) => {
      const StatusIcon = STATUS_ICONS[row.status];
      return (
        <MuiBox
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: STATUS_COLORS[row.status] ?? 'text.primary',
          }}
        >
          {StatusIcon && <StatusIcon fontSize="small" />}
          {STATUS_LABELS[row.status] ?? row.status}
        </MuiBox>
      );
    },
  },
  {
    field: 'assignee_name',
    headerName: 'Assignee',
    width: 180,
    renderCell: ({ row }) => (
      <MuiBox
        component="span"
        sx={{ color: row.assignee_active ? 'text.primary' : 'text.disabled' }}
      >
        {row.assignee_name}
      </MuiBox>
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
      <MuiBox sx={{ height: 600, width: '100%' }}>
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
      </MuiBox>
    </ThemeProvider>
  );
};
