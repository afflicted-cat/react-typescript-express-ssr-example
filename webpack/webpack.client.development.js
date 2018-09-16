const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const getLocalIdent = require('css-loader/lib/getLocalIdent');
const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { client } = require('./common');
const paths = require('./paths');

const host = process.env.HOST;
const port = process.env.DEV_PORT;

module.exports = merge(client, {
  entry: {
    bundle: ['webpack-hot-middleware/client']
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
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              context: paths.root,
              localIdentName: '[local][hash:base64:5]',
              getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                const fromAssets = loaderContext.resourcePath.includes('assets');
                return fromAssets ? localName : getLocalIdent(loaderContext, localIdentName, localName, options);
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [paths.nodeModules, paths.assets]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar({ name: 'client', compiledIn: false }),
    new OpenBrowserPlugin({ url: `http://${host}:${port}` })
  ]
});
