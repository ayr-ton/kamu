import { createMuiTheme } from '@material-ui/core';

const typography = {
  useNextVariants: true,
};

const defaultProps = {
  MuiButton: {
    variant: 'contained',
    color: 'secondary',
  },
  MuiIconButton: {
    color: 'secondary',
  },
  MuiBadge: {
    color: 'primary',
  },
};

export const darkTheme = createMuiTheme({
  typography,
  palette: {
    primary: { main: '#fe3e4d' },
    secondary: { main: '#bdbdbd' },
    type: 'dark',
  },
  props: defaultProps,
});

export const lightTheme = createMuiTheme({
  typography,
  palette: {
    primary: { main: '#fe3e4d' },
    secondary: { main: '#424242' },
    type: 'light',
  },
  props: defaultProps,
});

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
