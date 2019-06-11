const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { createSelectorName } = require('./utils');
const { client } = require('./common');
const paths = require('./paths');

module.exports = merge(client, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle: ['webpack-hot-middleware/client?reload=true']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                getLocalIdent: createSelectorName,
                localIdentName: '[local][hash:base64:5]'
              }
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              root: paths.src
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false,
              includePaths: [paths.nodeModules, paths.src]
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new WebpackBar({ name: 'client', color: 'orange' })]
});
