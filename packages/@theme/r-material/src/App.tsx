import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RouteWithSubRoutes } from './router';
import configureStore from './store';

import Navigation from './core/components/Navigation';


import * as config from '@/config.json';

interface AppProps {
  router: object[]
}

const site = config.site;
const store = configureStore();

export default class App extends React.Component<AppProps> {


  render(): React.ReactNode {
    let $this = this;
    return (
      <Provider store={store}>
        <Router>
          <Navigation
            title={site.title}
            menus={[]}
          />
          <div>
            {$this.props.router.map((route, i): JSX.Element => (
              <RouteWithSubRoutes
                key={i}
                {...route}
              />
            ))}
          </div>
        </Router>
      </Provider>
    );
  }
}

export { store };
