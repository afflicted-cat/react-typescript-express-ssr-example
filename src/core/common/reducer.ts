import { combineReducers } from 'redux';

import { commonReducer, CommonState } from '@core/features/common';

export interface AppState {
  common: CommonState;
}

export const reducer = combineReducers<AppState>({
  common: commonReducer
});
