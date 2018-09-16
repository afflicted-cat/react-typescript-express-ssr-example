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
  const store = configureStore(createMemoryHistory({ initialEntries: [req.url] }), undefined);
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  const { css: styles, js: scripts } = groupWebpackAssets(assetsByChunkName.bundle);
  const context: { url?: string; status?: number } = {};
  const url: string = req.url.split(/[?#]/)[0];

  const branch = matchRoutes(appRoutes, url);
  const pendingActions = preloadData(branch, store);

  return Promise.all(pendingActions).then(() => {
    if (context.status === 301 || context.status === 302) {
      return res.redirect(context.url as string, context.status);
    }

    if (context.status === 404) {
      res.status(404);
    }

    const state = `window.__INITIAL_STATE__ = ${serialize(store.getState())};`;
    const content = renderApp(store, context, req.url);

    return res.send(renderHtml({ content, styles, scripts, state }));
  });
});
