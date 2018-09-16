import { merge } from 'ramda';

export interface AppConfig {
  evn: string;
  host: string;
  port: number;
  isDev: boolean;
  apiUrl: string;
  socketUrl: string;
  isBrowser: boolean;
  translateUrl: string;
}

// tslint:disable: no-string-literal

const defaultConfig = {
  common: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    isBrowser: process && process['browser'],
    basename: '/'
  },
  development: {
    host: process.env.HOST || 'localhost',
    port: process.env.DEV_PORT || 3001,
    apiUrl: ``
  },
  production: {
    host: process.env.HOST || 'localhost',
    port: process.env.PROD_PORT || 8081,
    apiUrl: ``
  }
};

export const config: AppConfig = merge(defaultConfig.common, defaultConfig[defaultConfig.common.env]);
