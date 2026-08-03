import { createTheme, Theme } from '@mui/material/styles';
import { Box, Heading } from 'theme-ui';
import { useCasesWithAssignee } from './useCasesWithAssignee';
import { Loading, ErrorState } from 'shared';
import { CasesTable } from '../../components/CasesTable/CasesTable';

interface CaseListViewProps {
  muiTheme?: Theme;
}

const defaultMuiTheme = createTheme();

export const CaseListView = ({
  muiTheme = defaultMuiTheme,
}: CaseListViewProps) => {
  const {
    data: cases,
    isLoading,
    isError,
    error,
    rowCount,
    paginationModel,
    onPaginationModelChange,
    assigneeOptions,
    assigneeFilter,
    onAssigneeFilterChange,
    onClearFilters,
  } = useCasesWithAssignee();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  return (
    <Box>
      <Heading
        sx={{
          fontSize: 'font-size-2xl',
          fontWeight: 'font-weight-bold',
        }}
      >
        Cases
      </Heading>
      <CasesTable
        cases={cases}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        muiTheme={muiTheme}
        assigneeOptions={assigneeOptions}
        assigneeFilter={assigneeFilter}
        onAssigneeFilterChange={onAssigneeFilterChange}
        onClearFilters={onClearFilters}
      />
    </Box>
  );
};
