import * as React from 'react';
import { Route } from 'react-router-dom';
import { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  component: ReactNode | JSX.Element;
  exact?: boolean;
}

let allRoutes: RouteConfig[] = [];

function registerRoutes(routes): void {
  allRoutes = allRoutes.concat(routes);
}

function RouteWithSubRoutes(route): JSX.Element {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props): JSX.Element => <route.component {...props} routes={route.routes} />}
    />
  );
}

function attachRoutes(): RouteConfig[] {
  return allRoutes;
}

export { registerRoutes, attachRoutes, RouteWithSubRoutes };
