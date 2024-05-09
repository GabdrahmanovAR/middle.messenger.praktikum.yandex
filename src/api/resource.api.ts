import HTTPTransport from '../@core/HttpTransport';
import { IAPIError, IFileInfo } from './model';

const resourceApi = new HTTPTransport();

export default class ResourceApi {
  async getFile(path: string): Promise<any> {
    return resourceApi.get(`/resources/${path}`);
  }

  async uploadFile(data: FormData): Promise<IFileInfo | IAPIError> {
    return resourceApi.post('/resources', { data });
  }
}
