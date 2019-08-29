import { createMuiTheme } from '@material-ui/core';

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
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#fe3e4d' },
    secondary: { main: '#bdbdbd' },
    type: 'dark',
  },
  props: defaultProps,
});

export const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#FE3E4D' },
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
