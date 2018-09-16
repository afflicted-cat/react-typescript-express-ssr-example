import { AppRoute } from 'common/routes';

import { CommonPage } from './page';

export const commonRoutes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: CommonPage
  }
];
