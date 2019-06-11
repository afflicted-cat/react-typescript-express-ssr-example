import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { AppApi } from '@core/api';

import { AppState } from './reducer';

export type PreloadAction = (pathName?: string) => ThunkAction<unknown, AppState, AppApi, AnyAction>;

// Actions that need to be dispatched at each route (SSR)
export const preloadActions: PreloadAction[] = [];
