import { AppRoute } from 'common/routes';

import { CommonPage } from './page';
import { getUser } from './effects';

export const commonRoutes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: CommonPage,
    preload: getUser
  }
];
