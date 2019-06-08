import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteWithSubRoutes } from './router';

import Navigation from './core/components/Navigation';


import * as config from '@/config.json';

interface AppProps {
  router: object[]
}

const site = config.site;

export default class App extends React.Component<AppProps> {


  render(): React.ReactNode {
    let $this = this;
    return (
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
    );
  }
}

