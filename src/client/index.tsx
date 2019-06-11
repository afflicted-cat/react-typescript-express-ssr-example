import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import { App } from '@core/app';
import { configureStore } from '@core/common/store';

import { registerServiceWorker } from './serviceWorker';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

registerServiceWorker();

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
  () => delete window.__INITIAL_STATE__
);
