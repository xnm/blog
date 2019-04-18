import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteWithSubRoutes } from './router';

interface AppProps {
  router: object[]
}

export default class App extends React.Component<AppProps> {


  render(): React.ReactNode {
    let $this = this;
    return (
      <Router>
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
