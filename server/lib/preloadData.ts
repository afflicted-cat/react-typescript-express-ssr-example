import { MatchedRoute } from 'react-router-config';
import { ifElse, equals, always } from 'ramda';
import { Store } from 'redux';

import { AppState } from '../../client/common/reducer';
import { PreloadAction, globalPreloadActions } from '../../client/common/preload';

const createPreloadActions = ifElse(equals(0), always(globalPreloadActions), always([]));

// tslint:disable: no-string-literal
export const preloadData = <T>(branch: Array<MatchedRoute<T>>, store: Store<AppState>) => {
  return branch.map(({ route, match }, index) => {
    let preloadActions = createPreloadActions(index);

    if (route.hasOwnProperty('preload')) {
      preloadActions = preloadActions.concat(route['preload']);
    }

    const pendingActions = preloadActions.map((action: PreloadAction) => {
      return store.dispatch(action(match));
    });

    return Promise.all(pendingActions);
  });
};
