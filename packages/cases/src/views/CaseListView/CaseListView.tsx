import { useMemo } from 'react';
import { Box, Heading } from 'theme-ui';
import { useCasesWithAssignee } from './useCasesWithAssignee';
import { Loading, ErrorState } from 'shared';
import { CasesTable } from '../../components/CasesTable/CasesTable';
import { CasesThemeTokens, defaultCasesThemeTokens } from '../../theme/tokens';
import { buildMuiTheme } from '../../theme/buildMuiTheme';

interface CaseListViewProps {
  themeTokens?: CasesThemeTokens;
}

export const CaseListView = ({
  themeTokens = defaultCasesThemeTokens,
}: CaseListViewProps) => {
  const muiTheme = useMemo(() => buildMuiTheme(themeTokens), [themeTokens]);

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
