import { config } from '@core/common/config';

export function registerServiceWorker() {
  if (!config.isDev && config.isBrowser && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
}
