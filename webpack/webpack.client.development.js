const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { client, createSelectorName } = require('./common');
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
              getLocalIdent: createSelectorName
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
  plugins: [new webpack.HotModuleReplacementPlugin(), new OpenBrowserPlugin({ url: `http://${host}:${port}` })]
});
