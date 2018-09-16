import * as React from 'react';
import { hot } from 'react-hot-loader';

import { Routes } from 'common/routes';

function RootApp() {
  return <Routes />;
}

export const Root = hot(module)(RootApp);
