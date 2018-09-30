const { resolve } = require('path');

const root = resolve(__dirname, '..');
const client = resolve(root, 'client');
const server = resolve(root, 'server');

module.exports = {
  root,
  client,
  server,
  dist: resolve(root, 'dist'),
  assets: resolve(client, 'assets'),
  tsLint: resolve(root, 'tslint.json'),
  nodeModules: resolve(root, 'node_modules'),
  tsConfig: resolve(root, 'tsconfig.json'),
  tsConfigClient: resolve(root, 'tsconfig.client.json')
};
