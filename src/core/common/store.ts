import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { initializeApi } from '@core/api';

import { reducer, AppState } from './reducer';
import { config } from './config';

export function configureStore(initialState?: AppState): Store<AppState> {
  const api = initializeApi(config.apiUrl);

  let middleware = applyMiddleware(thunk.withExtraArgument(api));

  if (config.isDev) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(reducer, initialState!, middleware);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const { reducer: neextReducer } = require('./reducer');
      store.replaceReducer(neextReducer);
    });
  }

  return store as Store<AppState>;
}
