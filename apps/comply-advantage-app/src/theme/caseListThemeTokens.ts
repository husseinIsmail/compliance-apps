import type { CasesThemeTokens } from 'cases';

import theme from './theme';

const caseListThemeTokens: CasesThemeTokens = {
  primaryColor: theme.colors.accent600 as string,
  primaryColorLight: theme.colors.neutral700 as string,
  secondaryColor: theme.colors.brand500 as string,
  errorColor: theme.colors.negative500 as string,
  successColor: theme.colors.positive500 as string,
  linkColor: theme.colors.accent400 as string,
  warningColor: theme.colors.neutral500 as string,
  textColor: theme.colors.textBase as string,
  backgroundColor: theme.colors.bgPanel as string,
  fontFamily: theme.fonts.body as string,
};

export default caseListThemeTokens;
