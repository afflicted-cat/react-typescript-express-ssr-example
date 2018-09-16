import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';

export interface AppState {
  router: RouterState;
}

export const reducer = combineReducers<AppState>({});
