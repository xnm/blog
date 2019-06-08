import { createMuiTheme } from '@material-ui/core/styles';

import * as config from '@/config.json';

const theme = createMuiTheme({
  palette: config.colors
});

export default theme;
