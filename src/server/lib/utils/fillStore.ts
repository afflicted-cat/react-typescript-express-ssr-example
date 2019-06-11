import { Store } from 'redux';

import { PreloadAction } from '@core/common/preload';
import { AppState } from '@core/common/reducer';

/**
 * dispatched actions and waiting to fill storage
 * @param {PreloadAction[]} actions
 * @param {Store<AppState>} store
 * @param {string} url current location.pathname + location.search
 */
export const fillStore = <T>(actions: PreloadAction[], store: Store<AppState>, url: string) => {
  return Promise.all(actions.map(action => store.dispatch(action(url))));
};
