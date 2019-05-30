import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import './core';
import './post';


import { attachRoutes } from './router';

import App from './App';

ReactDOM
  .render(<ThemeProvider theme={theme}>
      <App router={attachRoutes()}/>
    </ThemeProvider>,
    document.getElementById('app'));
