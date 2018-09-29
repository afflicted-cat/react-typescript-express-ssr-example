import { compose, groupBy, ifElse, unless, values, map } from 'ramda';

const updateWebpackPath = (path: string) => (path.startsWith('/') ? path : `/${path}`);
const getExtension = (filename: string) => filename.split('.').pop() as string;

const createEmptyAssets = (bundle: string) => ({ css: [], js: [updateWebpackPath(bundle)] });
const defaultToEmptyAssets = unless(Array.isArray, createEmptyAssets);
const groupAssets = compose(
  groupBy(getExtension),
  map(updateWebpackPath)
);

export const groupWebpackAssets = ifElse(Array.isArray, groupAssets, defaultToEmptyAssets);
export const groupManifestAssets = compose(
  groupWebpackAssets,
  values
);
