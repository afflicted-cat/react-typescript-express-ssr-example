const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const { dissoc } = require('ramda');
const path = require('path');

const webpackConfig = path.resolve(__dirname, '..', 'webpack.config');
const { node, target, resolve, module: webpackModule } = require(webpackConfig);

module.exports = (baseConfig, env, defaultConfig) =>
  merge(dissoc('module', defaultConfig), {
    node,
    target,
    resolve,
    module: webpackModule,
    plugins: [
      new MiniCssExtractPlugin({ filename: 'styles.css' }),
      new OpenBrowserPlugin({ url: `http://localhost:6006` })
    ],
    devServer: {
      hot: true,
      inline: true,
      overlay: true,
      compress: true,
      stats: 'minimal',
      historyApiFallback: {
        disableDotRule: true
      }
    }
  });
