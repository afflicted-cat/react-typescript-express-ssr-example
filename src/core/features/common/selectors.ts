import { createSelector } from 'reselect';

import { AppState } from '@core/common/reducer';

export const commonRootSelector = (state: AppState) => state.common;

export const userSelector = createSelector(
  commonRootSelector,
  common => common.user
);
export const userFetchedSelector = createSelector(
  commonRootSelector,
  common => common.fetched
);
export const userErrorSelector = createSelector(
  commonRootSelector,
  common => common.error
);
