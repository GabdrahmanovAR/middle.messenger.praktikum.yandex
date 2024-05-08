import { IAPIError, IUpdateUser, IUserInfo } from '../api/model';

export function isApiError(data: any): data is IAPIError {
  return data?.reason;
}

export function isUpdateUser(data: unknown): data is IUpdateUser {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return 'login' in data
      && 'first_name' in data
      && 'second_name' in data
      && 'display_name' in data
      && 'phone' in data
      && 'email' in data;
}
