import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { AppState } from '@core/common/reducer';
import { App } from '@core/app';

export const renderApp = (store: Store<AppState>, context?: object, location?: string | object) => {
  const appRoot = (
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return renderToString(appRoot);
};
