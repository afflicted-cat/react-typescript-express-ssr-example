import { AppRoute } from '@core/common/routes';

import { getUser } from './effects';
import { CommonPageContainer } from './page';

export const commonRoutes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: CommonPageContainer,
    preloadActions: () => getUser('weyheyhey')
  }
];
