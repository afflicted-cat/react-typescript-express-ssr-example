import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { appRoutes } from './common/routes';
import { PageTemplate } from './ui/templates';
import { renderRouting } from './common/routing';

import './assets/styles/global.scss';

export const App = hot(() => {
  return <PageTemplate title="React Typescript App">{renderRouting(appRoutes)}</PageTemplate>;
});
