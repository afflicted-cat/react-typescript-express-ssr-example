const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { createSelectorName } = require('./utils');
const paths = require('./paths');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';
const target = process.env.TARGET || 'client';
const isClient = target === 'client';
const publicPath = '/';

const common = {
  mode: NODE_ENV,
  context: paths.src,
  output: {
    publicPath,
    path: paths.dist
  },
  resolve: {
    mainFields: ['module', 'browser', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?([jt])sx?$/,
        exclude: paths.nodeModules,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          compact: isProduction,
          cacheIdentifier: target,
          configFile: paths.babelConfig,
          cacheCompression: isProduction
        }
      },
      {
        test: /\.m?([jt])sx?$/,
        loader: 'babel-loader',
        include: paths.nodeModules,
        exclude: [/@babel(?:\/|\\{1,2})runtime/, /core-js/],
        options: {
          babelrc: false,
          compact: false,
          configFile: false,
          sourceMaps: false,
          cacheDirectory: true,
          cacheCompression: isProduction,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                useBuiltIns: false,
                exclude: ['transform-typeof-symbol']
              }
            ]
          ]
        }
      },
      {
        loader: 'file-loader',
        exclude: [/\.m?([jt])sx?$/, /\.json$/, /\.s?css$/],
        options: {
          emitFile: isClient,
          name: 'assets/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ForkTsCheckerWebpackPlugin({ tsconfig: paths.tsConfig }),
    new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: true, cwd: process.cwd() })
  ],
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
    bundle: ['./client/index']
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
  publicPath,
  isProduction,
  isDevelopment
};
