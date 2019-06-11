import { getPreloadActionsFromRoutes } from './getPreloadActionsFromRoutes';

import { mockMatchedRoutes } from '../__mocks__/matchedRoutes';

describe('getPreloadActionsFromRoutes', () => {
  it('should return all actions', () => {
    const expected = getPreloadActionsFromRoutes(mockMatchedRoutes);

    expect(expected.length).toBe(3);
  });

  it('should return flat list', () => {
    const expected = getPreloadActionsFromRoutes(mockMatchedRoutes);

    expect(expected).toEqual(expect.not.arrayContaining([expect.any(Array)]));
  });
});
