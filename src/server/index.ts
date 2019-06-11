import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import 'isomorphic-fetch';
import './exitHandler';

import { assetsParser } from './middlewares/assetsParser';
import { getRequire } from './lib/utils';
import { router } from './router';

// tslint:disable:no-console

const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;
const app = express();

app.disable('x-powered-by');

app.use(helmet());

if (isProduction) {
  // In real app better to use nginx for static assets
  const httpHeaders = { maxAge: 31536000, redirect: false, lastModified: true };
  app.use(express.static(path.resolve(process.cwd(), 'dist'), httpHeaders));
}

if (!isProduction) {
  const webpackConfig = getRequire()(path.resolve(process.cwd(), 'webpack.config'));
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
      logLevel: 'error'
    })
  );
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(assetsParser(isProduction));
app.use('/', router);

app.use((err: string, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isProduction) {
    return res.status(500).send(err);
  }

  return res.sendStatus(500);
});

app.listen(port, () => {
  console.info(`✅✅✅ Server is running at http://${host}:${port} ✅✅✅`);
});
