import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '@editor/views/Page';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Page,
  },
];

export const RouterView: React.FC = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
      ))}
    </Switch>
  );
};
