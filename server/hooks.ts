import * as cssModuleHook from 'css-modules-require-hook';
import * as assetsHook from 'asset-require-hook';

cssModuleHook({
  extensions: ['.css', '.scss', '.less'],
  generateScopedName: '[local][hash:base64:5]',
  processorOpts: { parser: require('postcss-scss').parse }
});

assetsHook({
  limit: 1,
  publicPath: '/',
  name: 'assets/[name].[hash:8].[ext]',
  extensions: ['ttf', 'woff', 'svg', 'eot', 'woff2', 'ico', 'jpg', 'png', 'gif', 'jpeg', 'bmp']
});
