import { merge } from 'ramda';

export interface AppConfig {
  env: string;
  isDev: boolean;
  apiUrl: string;
  useRender: boolean;
  isBrowser: boolean;
}

type Environment = 'common' | 'development' | 'production';

type Config = { [key in Environment]: Partial<AppConfig> };

// tslint:disable no-string-literal
const isBrowser = process && process['browser'];
const env = process.env.NODE_ENV || 'development';

const defaultConfig: Config = {
  common: {
    env,
    isBrowser,
    apiUrl: `https://api.github.com/`,
    isDev: process.env.NODE_ENV !== 'production',
    useRender: Boolean(isBrowser && localStorage.getItem('useRender'))
  },
  development: {},
  production: {}
};

export const config: AppConfig = merge(defaultConfig.common, defaultConfig[env]);
