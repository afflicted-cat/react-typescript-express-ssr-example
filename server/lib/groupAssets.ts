import { compose, groupBy, ifElse, unless, values, map } from 'ramda';

const createEmptyAssets = (bundle: string) => ({ css: [], js: [bundle] });
const updateWebpackPath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

const getExtension = (filename: string) => filename.split('.').pop() as string;
const groupAssets = (assets: string[]) =>
  compose(
    groupBy(getExtension),
    map(updateWebpackPath)
  )(assets);
const defaultToEmptyAssets = unless(Array.isArray, createEmptyAssets);

export const groupWebpackAssets = ifElse(Array.isArray, groupAssets, defaultToEmptyAssets);
export const groupManifestAssets = compose(
  groupWebpackAssets,
  values
);
