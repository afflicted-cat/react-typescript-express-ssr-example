import * as React from 'react';
import { RouteConfig } from 'react-router-config';
import { Route, Switch } from 'react-router';
import { omit, map } from 'ramda';

import { PreloadAction } from './preload';

import { commonRoutes } from 'features/common';

export interface ExtraRoureProps {
  preload?: PreloadAction | PreloadAction[];
}

export interface AppRoute extends RouteConfig, ExtraRoureProps {
  routes?: AppRoute[];
}

export const appRoutes: AppRoute[] = [...commonRoutes];

const routesWithoutChildrens = map<AppRoute, Omit<AppRoute, 'routes'>>(omit(['routes']), appRoutes);

export function Routes() {
  return (
    <Switch>
      {routesWithoutChildrens.map(props => (
        <Route key={props.path} {...props} />
      ))}
    </Switch>
  );
}
