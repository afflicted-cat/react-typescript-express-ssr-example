import { createAction, handleActions } from 'redux-actions';

import { CommonState, User } from './types';

enum CommonActions {
  fetchUser = 'fetchUser',
  successFetchUser = 'successFetchUser',
  errorFetchUser = 'errorFetchUser'
}

interface Payload {
  user: User;
  error: string;
}

export const fetchUser = createAction(CommonActions.fetchUser);
export const successFetchUser = createAction<Pick<Payload, 'user'>>(CommonActions.successFetchUser);
export const errorFetchUser = createAction<Pick<Payload, 'error'>>(CommonActions.errorFetchUser);

const initialState: CommonState = {
  fetched: false
};

export const commonReducer = handleActions<CommonState, Payload>(
  {
    [CommonActions.fetchUser]: state => ({ ...state, fetched: true }),
    [CommonActions.successFetchUser]: (state, { payload }) => ({ fetched: false, user: payload!.user }),
    [CommonActions.errorFetchUser]: (state, { payload }) => ({ ...state, fetched: false, error: payload!.error })
  },
  initialState
);
