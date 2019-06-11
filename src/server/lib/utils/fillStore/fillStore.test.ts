import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { PreloadAction } from '@core/common/preload';
import { AppState } from '@core/common/reducer';

import { fillStore } from './fillStore';

const mockStore = configureStore([thunk]);

describe('fillStore', () => {
  it('should call all actions', async () => {
    expect.assertions(2);

    const actions = [jest.fn(() => () => undefined), jest.fn(() => () => undefined)] as PreloadAction[];
    const store = mockStore({}) as MockStore<AppState>;

    await fillStore(actions, store, 'someUrl');

    actions.forEach(action => {
      expect(action).toBeCalledTimes(1);
    });
  });

  it('should call actions with arguments', async () => {
    expect.assertions(2);

    const actions = [jest.fn(() => () => undefined), jest.fn(() => () => undefined)] as PreloadAction[];
    const store = mockStore({}) as MockStore<AppState>;

    await fillStore(actions, store, 'someUrl');

    actions.forEach(action => {
      expect(action).toBeCalledWith('someUrl');
    });
  });

  it('should return a single Promise that resolves when all of actions have resolved', async () => {
    expect.assertions(1);

    const store = mockStore({}) as MockStore<AppState>;
    const actions = [
      jest.fn(() => async () => {
        return await new Promise(resolve => setImmediate(() => resolve('firstAction')));
      }),
      jest.fn(() => async () => {
        return await new Promise(resolve => setTimeout(() => resolve('secondAction'), 300));
      })
    ] as PreloadAction[];

    const result = await fillStore(actions, store, 'someUrl');

    expect(result).toEqual(['firstAction', 'secondAction']);
  });
});
