import { createTheme, Theme } from '@mui/material/styles';

import { CasesThemeTokens } from './tokens';

export const buildMuiTheme = (tokens: CasesThemeTokens): Theme =>
  createTheme({
    palette: {
      primary: {
        main: tokens.primaryColor,
        light: tokens.primaryColorLight,
      },
      secondary: { main: tokens.secondaryColor },
      error: { main: tokens.errorColor },
      success: { main: tokens.successColor },
      info: { main: tokens.linkColor },
      warning: { main: tokens.warningColor },
      text: { primary: tokens.textColor },
      background: { default: tokens.backgroundColor },
    },
    typography: {
      fontFamily: tokens.fontFamily,
    },
  });
