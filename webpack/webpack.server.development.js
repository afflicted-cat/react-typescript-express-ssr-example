const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { server } = require('./common');

module.exports = merge(server, {
  devtool: false,
  output: {
    filename: '[name].js'
  },
  plugins: [new WebpackBar({ name: 'server' }),
      new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        fallbackModuleFilenameTemplate: '[absolute-resource-path]',
        moduleFilenameTemplate: '[absolute-resource-path]'
      })
  ]
});
