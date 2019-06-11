import { AppState } from '@core/common/reducer';

declare global {
  interface Window {
    __INITIAL_STATE__: AppState;
  }
}
