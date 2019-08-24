import { createMuiTheme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    type: 'light',
  },
});
