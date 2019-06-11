import { MatchedRoute } from 'react-router-config';

export const mockMatchedRoutes: Array<MatchedRoute<{}>> = [
  {
    route: { exact: true, path: '/test', preloadActions: [jest.fn()], protectedRoute: false },
    match: { path: '/test', url: '/test', isExact: true, params: {} }
  },
  {
    route: { exact: false, path: '/test', preloadActions: [jest.fn(), jest.fn()], protectedRoute: false },
    match: { path: '/test', url: '/test', isExact: false, params: {} }
  },
  {
    route: { exact: false, path: '/test', protectedRoute: false },
    match: { path: '/test', url: '/test', isExact: false, params: {} }
  }
];
