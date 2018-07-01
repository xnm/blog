import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {applyMiddleware, createStore} from 'redux';
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';

import App from '@/App';

const history = createBrowserHistory();

const composeEnhancer = composeWithDevTools({});

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(routerMiddleware(history))
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
