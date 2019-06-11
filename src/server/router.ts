import { StaticRouterContext } from 'react-router';
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import express from 'express';

import { appRoutes } from '@core/common/routes';
import { configureStore } from '@core/common/store';
import { preloadActions } from '@core/common/preload';

import { renderApp, renderHtml } from './lib/render';
import { fillStore, getPreloadActionsFromRoutes } from './lib/utils';

export const router = express.Router();

router.get('*', async (req, res, next) => {
  try {
    const { css: styles, js: scripts } = res.locals.assets;
    const reqUrl: string = req.url.split(/[?#]/)[0];
    const context: StaticRouterContext = {};

    const matchedRoutes = matchRoutes(appRoutes, reqUrl);
    const store = configureStore();

    const routesActions = getPreloadActionsFromRoutes(matchedRoutes);
    const actions = preloadActions.concat(routesActions);

    await fillStore(actions, store, req.url);

    const content = renderApp(store, context, req.url);

    if (context.statusCode && String(context.statusCode).startsWith('30') && context.url) {
      return res.redirect(context.statusCode, context.url);
    }

    if (context.statusCode === 404) {
      res.status(404);
    }

    const initialValues = `
      window.__INITIAL_STATE__ = ${serialize(store.getState())};
    `;

    res.send(renderHtml({ content, styles, scripts, initialValues }));
  } catch (error) {
    next(error);
  }
});
