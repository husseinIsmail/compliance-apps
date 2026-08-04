import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from 'theme-ui';
import { Loading, ErrorState } from 'shared';
import { useCaseWithAssignee } from './useCaseWithAssignee';
import { STATUS_LABELS } from '../../consts';

export const CaseDetailView = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const {
    data: caseItem,
    isLoading,
    isError,
    error,
  } = useCaseWithAssignee(caseId ?? '');

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !caseItem) {
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
        Case
      </Heading>
      <Text sx={{ display: 'block', mt: 'spacing-md' }}>
        {caseItem.name}
      </Text>
      <Text sx={{ display: 'block', mt: 'spacing-md', color: 'textMuted' }}>
        {caseItem.identifier}
      </Text>
      <Text sx={{ display: 'block', mt: 'spacing-md' }}>
        Status: {STATUS_LABELS[caseItem.status] ?? caseItem.status}
      </Text>
      <Text sx={{ display: 'block', mt: 'spacing-xs' }}>
        Assignee: {caseItem.assignee_name}
        {!caseItem.assignee_active && ' (inactive)'}
      </Text>
    </Box>
  );
};
