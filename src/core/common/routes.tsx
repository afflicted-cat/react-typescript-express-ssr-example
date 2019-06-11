import * as React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { unnest } from 'ramda';

import { PreloadAction } from './preload';

import { commonRoutes } from '@core/features/common';

export interface ExtraRoureProps {
  preloadActions?: PreloadAction | PreloadAction[];
}

export interface RouteComponentProps<T = {}> extends RouteConfigComponentProps<T> {
  routes?: AppRoute[];
}

export interface AppRoute extends RouteConfig, ExtraRoureProps {
  routes?: AppRoute[];
  component: React.ComponentType<RouteComponentProps> | React.ComponentType;
}

export const appRoutes = unnest([commonRoutes]) as AppRoute[];
