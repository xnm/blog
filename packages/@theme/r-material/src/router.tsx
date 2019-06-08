import * as React from 'react';
import { Route } from 'react-router-dom';

let allRoutes: object[] = [];

function registerRoutes(routes): void {
  allRoutes = allRoutes.concat(routes);
}

function RouteWithSubRoutes(route): JSX.Element {
  return (
    <Route path={route.path} render={(props): JSX.Element => <route.component {...props} routes={route.routes} />} />
  );
}

function attachRoutes(): object[] {
  return allRoutes;
}

export { registerRoutes, attachRoutes, RouteWithSubRoutes };
