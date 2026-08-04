import { createTheme } from '@mui/material/styles';

export interface CasesThemeTokens {
  primaryColor: string;
  primaryColorLight: string;
  secondaryColor: string;
  errorColor: string;
  successColor: string;
  linkColor: string;
  warningColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

const fallback = createTheme();

export const defaultCasesThemeTokens: CasesThemeTokens = {
  primaryColor: fallback.palette.primary.main,
  primaryColorLight: fallback.palette.primary.light,
  secondaryColor: fallback.palette.secondary.main,
  errorColor: fallback.palette.error.main,
  successColor: fallback.palette.success.main,
  linkColor: fallback.palette.info.main,
  warningColor: fallback.palette.warning.main,
  textColor: fallback.palette.text.primary,
  backgroundColor: fallback.palette.background.default,
  fontFamily:
    fallback.typography.fontFamily ??
    '"Roboto", "Helvetica", "Arial", sans-serif',
};
