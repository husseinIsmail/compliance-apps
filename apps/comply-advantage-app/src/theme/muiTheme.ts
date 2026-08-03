import { createTheme } from '@mui/material/styles';

import theme from './theme';

const muiTheme = createTheme({
  palette: {
    primary: { main: theme.colors.accent600 as string },
    secondary: { main: theme.colors.brand500 as string },
    error: { main: theme.colors.negative500 as string },
    success: { main: theme.colors.positive500 as string },
    text: { primary: theme.colors.textBase as string },
    background: { default: theme.colors.bgPanel as string },
  },
  typography: {
    fontFamily: theme.fonts.body as string,
  },
});

export default muiTheme;
