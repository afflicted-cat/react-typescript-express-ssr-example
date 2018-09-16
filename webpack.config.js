const { resolve } = require('path');
const { register } = require('ts-node');

register({ project: 'tsconfig.json', transpileOnly: true });

const target = process.env.TARGET || 'client';
const enviroment = process.env.NODE_ENV || 'development';

module.exports = require(resolve(__dirname, 'webpack', `webpack.${target}.${enviroment}`));
