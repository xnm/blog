import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from '@/core/containers/HomePage';
import NotFound from '@/core/containers/NotFound';

class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    );
  };
}

export default Routes;
