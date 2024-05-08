import { IUpdatePassword, IUserInfo } from '../api/model';
import UserApi from '../api/user.api';
import { isApiError } from '../utils/type-check';
import { getUser } from './auth.service';
import { setGlobalError } from './global-error.service';

const userApi = new UserApi();

export const checkUserData = async (): Promise<void> => {
  const { store } = window;
  const state = store.getState();
  if (!state.user || Object.keys(state.user).length === 0) {
    store.set({ isLoading: true });
    try {
      const user = await getUser();
      store.set({ user });
    } catch (error) {
      setGlobalError(error);
    } finally {
      store.set({ isLoading: false });
    }
  }
};

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
