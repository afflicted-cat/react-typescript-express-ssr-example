const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const { cpus } = require('os');

const { server } = require('./common');

module.exports = merge(server, {
  output: {
    filename: '[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        parallel: cpus().length,
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false
          },
          output: {
            comments: false,
            ascii_only: true
          }
        }
      })
    ]
  }
});
