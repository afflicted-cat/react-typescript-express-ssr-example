import { Dispatch } from 'redux';

import { AppApi } from 'api';
import { AppState } from 'common/reducer';

import { User } from './types';
import { errorFetchUser, fetchUser, successFetchUser } from './reducer';

export const getUser = (name = 'weyheyhey') => {
  return async (dispatch: Dispatch<{}>, getState: () => AppState, { requestApi }: AppApi) => {
    dispatch(fetchUser());
    try {
      const user: User = await requestApi.get(`users/${name}`);
      dispatch(successFetchUser({ user }));
    } catch ({ message }) {
      dispatch(errorFetchUser({ error: message }));
    }
  };
};
