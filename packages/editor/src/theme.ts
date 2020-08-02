import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#C2C2C2',
      contrastText: '#000000',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F5F5F5',
    },
  },
});
