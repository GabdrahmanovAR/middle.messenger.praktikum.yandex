import { IUserInfo } from '../api/model';
import UserApi from '../api/user.api';
import { isApiError } from '../utils/type-check';

const userApi = new UserApi();

export const updateUserInfo = async (data: Partial<IUserInfo>): Promise<void> => {
  window.store.set({ isLoading: true });

  try {
    const user = await userApi.updateProfile(data);

    if (!isApiError(user)) {
      window.store.set({ user });
    }
  } catch (error) {
    console.error(error);
  } finally {
    window.store.set({ isLoading: false });
  }
};
