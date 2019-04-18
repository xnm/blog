import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './core';
import './post';

import { attachRoutes } from './router';

import App from './App';

ReactDOM.render(<App router={attachRoutes()}/>, document.getElementById('app'));
