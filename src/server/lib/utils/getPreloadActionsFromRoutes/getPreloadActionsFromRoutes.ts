import { MatchedRoute } from 'react-router-config';
import { unnest, compose, map } from 'ramda';

// tslint:disable: no-string-literal
const getActions = <T>({ route }: MatchedRoute<T>) => route['preloadActions'] || [];

/**
 * Returns a flat list with actions
 * @param {Array<MatchedRoute<T>} matchedRoutes
 */
export const getPreloadActionsFromRoutes = <T>(matchedRoutes: Array<MatchedRoute<T>>) => {
  return compose(
    unnest,
    map(getActions)
  )(matchedRoutes);
};
