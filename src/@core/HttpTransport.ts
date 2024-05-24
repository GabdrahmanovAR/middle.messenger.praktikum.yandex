import { HOST } from '../constants';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

type Options = {
  method: METHOD;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  data?: unknown;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = <R = unknown>(url: string, options?: OptionsWithoutMethod) => Promise<R>;

export default class HTTPTransport {
  private readonly preffix: string = HOST;

  public get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.GET })
  );

  public post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.POST })
  );

  public put: HTTPMethod = (url: string, options: OptionsWithoutMethod = {}) => (
    this.request(url, { ...options, method: METHOD.PUT })
  );

  public delete: HTTPMethod = (url: string, options: OptionsWithoutMethod = {}) => (
    this.request(url, { ...options, method: METHOD.DELETE })
  );

  request<T>(url: string, options: Options = { method: METHOD.GET }): Promise<T> {
    const {
      headers = {},
      method,
      data,
      withCredentials = true,
      timeout,
      responseType = 'json',
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.preffix}${url}`);

      Object.keys(headers).forEach((key: string) => xhr.setRequestHeader(key, headers[key]));
      xhr.withCredentials = withCredentials;
      xhr.timeout = timeout ?? 10000;
      xhr.responseType = responseType;

      // успешное выполнение
      xhr.onload = (): void => {
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          reject({ status, reason: xhr.response?.reason });
        }
      };

      xhr.onabort = (): void => reject(new Error(JSON.stringify({ reason: 'aborted' })));
      xhr.onerror = (): void => reject(new Error(JSON.stringify({ reason: 'network error' })));
      xhr.ontimeout = (): void => reject(new Error(JSON.stringify({ reason: 'timeout' })));

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
