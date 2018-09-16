import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import { configureStore } from 'common/store';
import { Root } from './root';

import 'assets/styles/global.scss';

// tslint:disable: no-string-literal
const history = createBrowserHistory();
const initialState = window['__INITIAL_STATE__'];

const store = configureStore(history, initialState);

delete window['__INITIAL_STATE__'];

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
