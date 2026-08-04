import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from 'theme-ui';
import MuiBox from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Loading, ErrorState } from 'shared';
import { useCaseWithAssignee } from './useCaseWithAssignee';
import { STATUS_COLORS, STATUS_ICONS, STATUS_LABELS } from '../../consts';
import { CasesThemeTokens, defaultCasesThemeTokens } from '../../theme/tokens';
import { buildMuiTheme } from '../../theme/buildMuiTheme';

interface CaseDetailViewProps {
  themeTokens?: CasesThemeTokens;
}

export const CaseDetailView = ({
  themeTokens = defaultCasesThemeTokens,
}: CaseDetailViewProps) => {
  const muiTheme = useMemo(() => buildMuiTheme(themeTokens), [themeTokens]);
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

  const StatusIcon = STATUS_ICONS[caseItem.status];

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
      <Text sx={{ display: 'block', mt: 'spacing-md' }}>{caseItem.name}</Text>

      <Text sx={{ display: 'block', mt: 'spacing-md' }}>
        Status:{' '}
        <ThemeProvider theme={muiTheme}>
          <MuiBox
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: STATUS_COLORS[caseItem.status] ?? 'text.primary',
            }}
          >
            {StatusIcon && <StatusIcon fontSize="small" />}
            {STATUS_LABELS[caseItem.status] ?? caseItem.status}
          </MuiBox>
        </ThemeProvider>
      </Text>
      <Text sx={{ display: 'block', mt: 'spacing-xs' }}>
        Assignee: {caseItem.assignee_name}
        {!caseItem.assignee_active && ' (inactive)'}
      </Text>
    </Box>
  );
};
