import { createMuiTheme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#f50057' },
    secondary: { main: '#f50057' },
    type: 'dark',
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
});

export const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#37474f' },
    secondary: { main: '#f50057' },
    type: 'light',
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
});

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
