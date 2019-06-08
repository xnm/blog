import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import store from './store';

import './core';
import './post';

import { attachRoutes } from './router';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App router={attachRoutes()} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);
