import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import { renderToStaticMarkup } from 'react-dom/server';
import * as compression from 'compression';
import * as webpack from 'webpack';
import * as express from 'express';
import * as helmet from 'helmet';
import * as React from 'react';
import * as path from 'path';
import 'isomorphic-fetch';
import './exitHandler';
import './hooks';

import { devRouter, prodRouter } from './routes';
import { dynamicRequire } from './lib';
import { renderHtml } from './render';

const isDevelopment = process.env.NODE_ENV === 'development';
const port = isDevelopment ? process.env.DEV_PORT : process.env.PROD_PORT;
const host = process.env.HOST;
const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(helmet());

if (isDevelopment) {
  const webpackConfig = dynamicRequire(path.resolve(process.cwd(), 'webpack.config'));
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
      logLevel: 'error'
    })
  );
  app.use(webpackHotMiddleware(compiler, { log: console.log })); // tslint:disable-line
  app.use('/', devRouter);
} else {
  const httpHeaders = { redirect: false, maxAge: 31536000, lastModified: true };
  app.use(express.static(path.resolve(process.cwd(), 'dist'), httpHeaders));
  app.use('/', prodRouter);
}

// tslint:disable:no-console
app.use((err: string, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const content = renderToStaticMarkup(<div>Server Error</div>);
  res.status(500).send(renderHtml({ content }));
  console.error(err);
  next(err);
});

app.listen(port, () => {
  console.info(`✅✅✅ Server is running at http://${host}:${port} ✅✅✅`);
});
