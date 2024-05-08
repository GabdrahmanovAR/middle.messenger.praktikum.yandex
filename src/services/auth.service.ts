import router from '../@core/Router';
import AuthApi from '../api/auth.api';
import {
  ICreateUser, ILoginRequestData, IUserInfo,
} from '../api/model';
import Routes from '../api/routes';
import { isApiError } from '../utils/type-check';
import { setGlobalError } from './global-error.service';

const authApi = new AuthApi();

export const getUser = async (): Promise<IUserInfo> => {
  const userResponse = await authApi.user();

  if (isApiError(userResponse)) {
    throw new Error(userResponse.reason);
  }

  return userResponse;
};

export const login = async (data: ILoginRequestData): Promise<void> => {
  window.store.set({ isLoading: true });

  try {
    await authApi.login(data);
    const user = await getUser();
    window.store.set({ user });

    router.go(Routes.CHATS);
  } catch (error: unknown) {
    setGlobalError(error, 'Ошибка авторизации');
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const createUser = async (data: ICreateUser): Promise<void> => {
  const createResponse = await authApi.create(data);

  if (isApiError(createResponse)) {
    throw new Error(createResponse.reason);
  }

  const user = await getUser();

  console.log(createResponse);
  console.log(user);
};

export const logout = async (): Promise<void> => {
  await authApi.logout();

  router.go(Routes.LOGIN);
};
