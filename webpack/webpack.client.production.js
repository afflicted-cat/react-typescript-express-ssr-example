const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const { client, publicPath } = require('./common');
const { createSelectorName } = require('./utils');
const paths = require('./paths');

const workerName = 'service-worker';
const workerManifestName = 'precache-manifes';

const isWorkerRegExp = new RegExp(`${workerName}|${workerManifestName}`);

module.exports = merge(client, {
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          parse: {
            ecma: 8
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotations: true } } })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
              modules: {
                mode: 'local',
                getLocalIdent: createSelectorName,
                localIdentName: '[local][hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                })
              ]
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
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
  plugins: [
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      filter: ({ name }) => !isWorkerRegExp.test(name)
    }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }),
    new GenerateSW({
      skipWaiting: false,
      clientsClaim: false,
      swDest: `${workerName}.js`,
      directoryIndex: publicPath,
      precacheManifestFilename: `${workerManifestName}.[manifestHash].js`,
      runtimeCaching: [
        {
          handler: 'CacheFirst',
          urlPattern: new RegExp('^https?://fonts.(?:googleapis|gstatic).com/(.*)')
        },
        {
          handler: 'NetworkFirst',
          urlPattern: new RegExp('/')
        }
      ]
    })
  ]
});
