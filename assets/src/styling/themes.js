import { createMuiTheme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  },
});

export const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    type: 'light',
  },
});
