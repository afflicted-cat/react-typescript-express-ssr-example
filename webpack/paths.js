const { resolve } = require('path');

const root = resolve(__dirname, '..');

const src = resolve(root, 'src');
const core = resolve(src, 'core');
const client = resolve(src, 'client');
const server = resolve(src, 'server');

module.exports = {
  src,
  core,
  root,
  client,
  server,
  dist: resolve(root, 'dist'),
  assets: resolve(client, 'assets'),
  tsLint: resolve(root, 'tslint.json'),
  tsConfig: resolve(root, 'tsconfig.json'),
  nodeModules: resolve(root, 'node_modules'),
  babelConfig: resolve(root, 'babel.config.js')
};
