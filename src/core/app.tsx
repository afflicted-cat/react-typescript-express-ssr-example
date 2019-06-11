import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { PageTemplate } from '@core/ui/templates';

import { appRoutes } from './common/routes';
import { renderRouting } from './common/routing';

import './assets/styles/global.scss';

export const App = hot(() => {
  return <PageTemplate title="React Typescript App">{renderRouting(appRoutes)}</PageTemplate>;
});
