import { compose, groupBy, values, map, unnest } from 'ramda';

const updatePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);
const getExtension = (filename: string) => filename.split('.').pop()!;

const groupAssets = compose<string[], string[], object>(
  groupBy(getExtension),
  map(updatePath)
);

/**
 * @param {object} assets
 * @example
 * // returns { css: ['/group1.css', '/group2.css'], js: ['/group1.js', '/group2.js'] }
 *
 * const assets = { group1: ['group1.css', 'group1.js'], group2: ['group2.css', 'group2.js'] }
 *
 * getGroupedAssets(assets)
 */
export const getGroupedAssets = compose(
  groupAssets,
  unnest,
  values
);
