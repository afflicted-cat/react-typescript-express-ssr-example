import { ThunkAction } from 'redux-thunk';

import { AppApi } from 'api';
import { AppState } from 'common/reducer';

// tslint:disable: no-any
export type PreloadAction = (...args: any[]) => ThunkAction<Promise<any>, AppState, AppApi>;

// Экшены, которые необходимо диспатчить на каждом роуте (SSR)
export const globalPreloadActions: PreloadAction[] = [];
