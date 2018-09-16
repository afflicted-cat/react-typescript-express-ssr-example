import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router';

import { PreloadAction } from './preload';

import { commonRoutes } from 'features/common';

export interface AppRoute extends RouteProps {
  preload?: PreloadAction | PreloadAction[];
}

export const appRoutes: AppRoute[] = [...commonRoutes];

export function Routes() {
  return (
    <Switch>
      {appRoutes.map(props => (
        <Route key={props.path} {...props} />
      ))}
    </Switch>
  );
}
