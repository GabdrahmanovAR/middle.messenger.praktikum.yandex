import { EMPTY_STRING } from '../../assets/constants/common';
import { IAddChatUser, IUpdatePassword, IUserInfo } from '../api/model';
import UserApi from '../api/user.api';
import { isApiError } from '../utils/type-check';
import { setGlobalError } from './global-error.service';

const userApi = new UserApi();

export const updateUserInfo = async (data: Partial<IUserInfo>): Promise<void> => {
  window.store.set({ isLoading: true });

  try {
    const user = await userApi.updateProfile(data);

    if (!isApiError(user)) {
      window.store.set({ user });
    }
  } catch (error) {
    setGlobalError(error);
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const updateUserPassword = async (data: IUpdatePassword): Promise<void> => {
  window.store.set({ isLoading: true });

  try {
    await userApi.updatePassword(data);
  } catch (error) {
    setGlobalError(error);
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const updateUserAvatar = async (file: File): Promise<void> => {
  window.store.set({ isLoading: true });

  const data = new FormData();
  data.append('avatar', file);

  try {
    const user = await userApi.updateAvatar(data);
    if (!isApiError(user)) {
      window.store.set({ user });
    }
  } catch (error) {
    setGlobalError(error);
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const findUser = async (login: string): Promise<IUserInfo[] | null> => {
  const findedUser = await userApi.findUser({ login });

  if (isApiError(findedUser) || (Array.isArray(findedUser) && findedUser.length === 0)) {
    return null;
  }
  return findedUser;
};
