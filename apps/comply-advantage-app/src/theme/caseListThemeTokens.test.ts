import theme from './theme';
import caseListThemeTokens from './caseListThemeTokens';

describe('caseListThemeTokens', () => {
  it('maps each token to the correct theme.ts value', () => {
    expect(caseListThemeTokens).toEqual({
      primaryColor: theme.colors.accent600,
      primaryColorLight: theme.colors.neutral700,
      primaryColorDark: theme.colors.accent500,
      secondaryColor: theme.colors.brand500,
      errorColor: theme.colors.negative500,
      successColor: theme.colors.positive500,
      textColor: theme.colors.textBase,
      backgroundColor: theme.colors.bgPanel,
      fontFamily: theme.fonts.body,
    });
  });
});
