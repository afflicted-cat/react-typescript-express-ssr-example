import * as serialize from 'serialize-javascript';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { appRoutes } from '../../client/common/routes';
import { configureStore } from '../../client/common/store';

import { cacheMiddleware, getCacheKey, ssrCache } from '../cacheMiddleware';
import { groupManifestAssets, preloadData, dynamicRequire } from '../lib';
import { renderApp, renderHtml } from '../render';

export const prodRouter = express.Router();

const assetsJson = path.resolve(process.cwd(), 'dist/asset-manifest.json');
let staticFiles: any = {}; // tslint:disable-line

if (fs.existsSync(assetsJson)) {
  staticFiles = dynamicRequire(assetsJson);
}

prodRouter.get('*', cacheMiddleware, async (req: express.Request, res: express.Response) => {
  const store = configureStore(createMemoryHistory({ initialEntries: [req.url] }));
  const { css: styles, js: scripts } = groupManifestAssets(staticFiles);
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

    const html = renderHtml({ content, styles, scripts, state });

    if (context.status !== 404 && process.env.SSR_CACHE === 'true') {
      ssrCache.set(getCacheKey(req), html);
    }

    return res.send(html);
  });
});
