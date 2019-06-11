export class RequestApi {
  constructor(private baseUrl: string, private defaultOptions?: RequestInit) {}

  public get(url: string, options?: RequestInit) {
    return this.createRequest('GET', url, options);
  }

  public post(url: string, body?: Object, options?: RequestInit) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('POST', url, fullOptions);
  }

  public put(url: string, body?: Object, options?: RequestInit) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('PUT', url, fullOptions);
  }

  public patch(url: string, body?: Object, options?: RequestInit) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('PATCH', url, fullOptions);
  }

  public delete(url: string, body?: Object, options?: RequestInit) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('DELETE', url, fullOptions);
  }

  private createRequest(method: string, url?: string, options?: RequestInit) {
    const fullOptions = Object.assign({ method }, this.defaultOptions, options);
    const fullUrl = `${this.baseUrl}${url}`;
    return fetch(fullUrl, fullOptions).then(res => {
      if (res.status !== 200) {
        throw Error(`Failed fetch to ${fullUrl}: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }
}
