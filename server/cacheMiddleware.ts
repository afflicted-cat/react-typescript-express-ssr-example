import * as LRUCache from 'lru-cache';
import * as express from 'express';

const cacheTime: number = process.env.SSR_CACHE_TIME ? parseInt(process.env.SSR_CACHE_TIME, 10) : 1000 * 60 * 60;

export const cacheMiddleware = express.Router();

export const ssrCache = new LRUCache({
  max: 500,
  maxAge: cacheTime
});

export const getCacheKey = (req: express.Request) => {
  return `${req.url}`;
};

cacheMiddleware.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (process.env.SSR_CACHE === 'true') {
    const key = getCacheKey(req);

    if (ssrCache.has(key)) {
      res.send(ssrCache.get(key));
      return;
    }
  }

  next();
});
