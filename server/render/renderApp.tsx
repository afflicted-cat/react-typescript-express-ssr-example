import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { Root } from '../../client/root';
import { AppState } from '../../client/common/reducer';

export const renderApp = (store: Store<AppState>, context?: object, location?: string | object) => {
  const appRoot = (
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <Root />
      </StaticRouter>
    </Provider>
  );

  return renderToString(appRoot);
};
