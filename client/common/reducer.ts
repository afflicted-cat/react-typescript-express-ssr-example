import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';

import { commonReducer, CommonState } from 'features/common';

export interface AppState {
  common: CommonState;
  router: RouterState;
}

export const reducer = combineReducers<AppState>({
  common: commonReducer
});
