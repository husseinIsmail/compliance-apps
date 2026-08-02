import { Box, Heading } from 'theme-ui';
import { useCasesWithAssignee } from './useCasesWithAssignee';
import { Loading, ErrorState } from 'shared';
import CasesTable from '../../components/CasesTable/CasesTable';

export const CaseListView = () => {
  const { data: cases, isLoading, isError, error } = useCasesWithAssignee();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  return (
    <Box>
      <Heading>Cases</Heading>
      <CasesTable cases={cases}></CasesTable>
    </Box>
  );
};
