const { compilerOptions } = require('./tsconfig');

const pathsEntries = Object.entries(compilerOptions.paths);

/**
 * @param glob path | alias name
 * @return {string} path without glob pattern
 */
const removeGlobPattern = glob => glob.replace('/*', '');

/**
 * @param name alias name
 * @return {string} formated name (for use by babel)
 */
const prepareName = name => removeGlobPattern(name);

/**
 * @param path alias path
 * @return {string} formated path (for use by babel)
 */
const preparePath = ([path]) => `./${compilerOptions.baseUrl}/${removeGlobPattern(path)}`;

const alias = pathsEntries.reduce((accum, [name, path]) => ({ ...accum, [prepareName(name)]: preparePath(path) }), {});

module.exports = function(api) {
  const { NODE_ENV, TARGET } = process.env;

  const isProduction = NODE_ENV === 'production';
  const isServer = TARGET === 'server';

  api.cache(() => `${NODE_ENV}${TARGET}`);

  // client settings in .browserslistrc
  const targets = isServer ? { node: 'current' } : undefined;

  const presets = [
    ['@babel/preset-env', { targets, loose: true, modules: false, useBuiltIns: 'usage', corejs: 3 }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ];

  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['babel-plugin-module-resolver', { alias }],
    ['@babel/plugin-transform-runtime']
  ];

  if (isProduction) {
    plugins.push(['@babel/plugin-transform-react-inline-elements']);
  }

  return {
    presets,
    plugins
  };
};
