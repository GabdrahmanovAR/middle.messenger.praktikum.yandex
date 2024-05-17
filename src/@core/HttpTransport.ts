import { HOST } from '../constants';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

type Options = {
  method: METHOD;
  headers?: any;
  withCredentials?: boolean;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  private readonly preffix: string = HOST;

  public get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHOD.GET });
  }

  public post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHOD.POST });
  }

  public put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHOD.PUT });
  }

  public delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHOD.DELETE });
  }

  request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const {
      headers,
      method,
      data,
      withCredentials = true,
      timeout,
      responseType = 'json',
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.preffix}${url}`);

      Object.keys(headers ?? {}).forEach((key: string) => xhr.setRequestHeader(key, headers[key]));
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
