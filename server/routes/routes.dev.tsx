import * as express from 'express';
import * as serialize from 'serialize-javascript';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';

import { appRoutes } from '../../client/common/routes';
import { configureStore } from '../../client/common/store';

import { groupWebpackAssets, preloadData } from '../lib';
import { renderApp, renderHtml } from '../render';

export const devRouter = express.Router();

devRouter.get('*', async (req: express.Request, res: express.Response) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  const { css: styles, js: scripts } = groupWebpackAssets(assetsByChunkName.bundle);
  const history = createMemoryHistory({ initialEntries: [req.url] });
  const url: string = req.url.split(/[?#]/)[0];
  const context: { url?: string; status?: number } = {};

  const store = configureStore(history);

  const branch = matchRoutes(appRoutes, url);
  const pendingActions = preloadData(branch, store);

  return Promise.all(pendingActions).then(() => {
    if (context.status === 301 || context.status === 302) {
      return res.redirect(context.url as string, context.status);
    }

    if (context.status === 404) {
      res.status(404);
    }

    const content = renderApp(store, context, req.url);
    const initialValues = `
      window.__INITIAL_STATE__ = ${serialize(store.getState())};
    `;

    return res.send(renderHtml({ content, styles, scripts, initialValues }));
  });
});
