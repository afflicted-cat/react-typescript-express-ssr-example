import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import thunk from 'redux-thunk';

import { initializeApi } from 'api';
import { AppState, reducer } from './reducer';
import { config } from './config';

export function configureStore(history: History, initialState?: AppState): Store<AppState> {
  const api = initializeApi(config.apiUrl);
  const withRouter = connectRouter(history);

  let middleware = applyMiddleware(thunk.withExtraArgument(api), routerMiddleware(history));

  if (config.isDev) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(withRouter(reducer), initialState!, middleware);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const { reducer: nextReducer } = require('./reducer');
      store.replaceReducer(withRouter(nextReducer));
    });
  }

  return store as Store<AppState>;
}
