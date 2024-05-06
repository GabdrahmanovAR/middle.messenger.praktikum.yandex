import HTTPTransport from '../@core/HttpTransport';
import {
  IAPIError, ICreateUser, ILoginRequestData, ISignUpResponse, IUserInfo,
} from './model';

const authApi = new HTTPTransport();

export default class AuthApi {
  async create(data: ICreateUser): Promise<ISignUpResponse> {
    return authApi.post<ISignUpResponse>('/auth/signup', { data });
  }

  async login(data: ILoginRequestData): Promise<void | IAPIError> {
    return authApi.post('/auth/signin', { data });
  }

  async user(): Promise<IUserInfo | IAPIError> {
    return authApi.get('/auth/user');
  }

  async logout(): Promise<void | IAPIError> {
    return authApi.post('/auth/logout');
  }
}
