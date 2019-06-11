import { Dispatch } from 'redux';

import { AppApi } from '@core/api';
import { AppState } from '@core/common/reducer';

import { User } from './types';
import { errorFetchUser, fetchUser, successFetchUser } from './reducer';

export function getUser(name: string) {
  return async (dispatch: Dispatch, getState: () => AppState, { requestApi }: AppApi) => {
    try {
      dispatch(fetchUser());
      const user: User = await requestApi.get(`users/${name}`);
      dispatch(successFetchUser({ user }));
    } catch ({ message }) {
      dispatch(errorFetchUser({ error: message }));
    }
  };
}
