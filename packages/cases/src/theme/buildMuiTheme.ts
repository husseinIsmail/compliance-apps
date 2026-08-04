import { createTheme, Theme } from '@mui/material/styles';

import { CasesThemeTokens } from './tokens';

export const buildMuiTheme = (tokens: CasesThemeTokens): Theme =>
  createTheme({
    palette: {
      primary: {
        main: tokens.primaryColor,
        light: tokens.primaryColorLight,
        dark: tokens.primaryColorDark,
      },
      secondary: { main: tokens.secondaryColor },
      error: { main: tokens.errorColor },
      success: { main: tokens.successColor },
      text: { primary: tokens.textColor },
      background: { default: tokens.backgroundColor },
    },
    typography: {
      fontFamily: tokens.fontFamily,
    },
  });
