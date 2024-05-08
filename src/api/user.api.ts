import HTTPTransport from '../@core/HttpTransport';
import {
  IAPIError, IFindUser, IUpdatePassword, IUpdateUser, IUserInfo,
} from './model';

const userApi = new HTTPTransport();

export default class UserApi {
  async updateProfile(data: Partial<IUpdateUser>): Promise<IUserInfo | IAPIError> {
    return userApi.put('/user/profile', { data });
  }

  async updateAvatar(data: FormData): Promise<IUserInfo | IAPIError> {
    return userApi.put('/user/profile/avatar', { data });
  }

  async updatePassword(data: IUpdatePassword): Promise<void | IAPIError> {
    return userApi.put('/user/password', { data });
  }

  async findUser(data: IFindUser): Promise<IUserInfo | IAPIError> {
    return userApi.post('/auth/logout', { data });
  }
}
