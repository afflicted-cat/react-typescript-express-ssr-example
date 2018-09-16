import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from '../client/common/store';

import 'assets/styles/global.scss';

const history = createMemoryHistory();

const store = configureStore(history);

const wrapStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%'
};

export const reactDecorator = story => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div style={wrapStyles}>{story()}</div>
    </ConnectedRouter>
  </Provider>
);
