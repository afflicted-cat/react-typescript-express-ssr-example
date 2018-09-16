const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const webpack = require('webpack');

const paths = require('./paths');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';
const target = process.env.TARGET || 'common';
const publicPath = '/';

const common = {
  mode: NODE_ENV,
  context: paths.root,
  output: {
    publicPath,
    path: paths.dist
  },
  resolve: {
    modules: ['node_modules', paths.client],
    mainFields: ['module', 'browser', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.tsConfig })]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        include: [paths.client, paths.server],
        options: {
          emitErrors: true,
          tsConfigFile: paths.tsConfig
        }
      },
      {
        test: /\.m?jsx?$/,
        loader: 'babel-loader',
        exclude: paths.nodeModules,
        options: {
          cacheDirectory: true,
          cacheIdentifier: target
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [paths.client, paths.server],
        options: {
          silent: isDevelopment,
          useCache: isDevelopment,
          forceIsolatedModules: isDevelopment,
          cacheDirectory: `node_modules/.awcache-${target}`,
          reportFiles: ['client/**/*.{ts,tsx}', 'server/**/*.{ts,tsx}']
        }
      }
    ]
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  stats: {
    colors: true,
    modules: false,
    children: false
  },
  performance: {
    hints: false
  }
};

const client = merge(common, {
  target: 'web',
  entry: {
    bundle: ['isomorphic-fetch', './client/index']
  },
  module: {
    rules: [
      {
        loader: 'file-loader',
        exclude: [/\.m?e?jsx?$/, /\.tsx?$/, /\.json$/, /\.s?css$/],
        options: {
          context: paths.root,
          name: 'assets/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dgram: 'empty',
    child_process: 'empty'
  }
});

const server = merge(common, {
  target: 'node',
  entry: {
    index: ['./server/index']
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              context: paths.root
            }
          }
        ]
      },
      {
        loader: 'file-loader',
        exclude: [/\.m?e?jsx?$/, /\.tsx?$/, /\.json$/, /\.s?css$/],
        options: {
          emitFile: false,
          context: paths.root,
          name: 'assets/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  }
});

module.exports = {
  common,
  client,
  server,
  isProduction,
  isDevelopment
};
