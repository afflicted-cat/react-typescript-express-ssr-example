import { RequestApi } from './request';

export interface AppApi {
  requestApi: RequestApi;
}

export const initializeApi = (fetchUrl: string): AppApi => ({
  requestApi: new RequestApi(fetchUrl)
});
