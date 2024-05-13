import { EMPTY_STRING } from '../../assets/constants/common';
import AuthApi from '../api/auth.api';
import {
  ICreateUser, ILoginRequestData, IUserInfo,
} from '../api/model';
import Routes from '../api/routes';
import { RESOURCE_HOST } from '../constants';
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

export const hasUserData = async (): Promise<boolean> => {
  const { store } = window;
  const state = store.getState();

  if (state.user && Object.keys(state.user).length > 0) {
    return true;
  }

  // первый запуск и не определен статус авторизации
  if (state.authorized === null) {
    store.set({ isLoading: true });
    try {
      const user = await getUser();
      const avatar = user.avatar ? `${RESOURCE_HOST}${user.avatar}` : EMPTY_STRING;
      store.set({
        user,
        authorized: true,
        avatar,
      });
      return true;
    } catch (error) {
      store.set({ authorized: false });
    } finally {
      store.set({ isLoading: false });
    }
  }
  return false;
};

export const login = async (data: ILoginRequestData): Promise<void> => {
  window.store.set({ isLoading: true });

  try {
    await authApi.login(data);
    const user = await getUser();
    const avatar = user.avatar ? `${RESOURCE_HOST}${user.avatar}` : EMPTY_STRING;
    window.store.set({ user, avatar });

    window.router.go(Routes.CHATS);
  } catch (error: unknown) {
    setGlobalError(error, 'Ошибка авторизации');
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const createUser = async (data: ICreateUser): Promise<void> => {
  const createResponse = await authApi.create(data);

  if (isApiError(createResponse)) {
    setGlobalError(createResponse);
  }

  if (createResponse.id) {
    const user = await getUser();
    window.store.set({ user });
    window.router.go(Routes.CHATS);
  }
};

export const canActivate = async (pathname: string): Promise<boolean> => {
  const hasUser = await hasUserData();
  if (pathname === Routes.LOGIN || pathname === Routes.SIGN_UP) {
    if (hasUser) {
      window.router.go(Routes.CHATS);
      return false;
    }
    return true;
  }
  if (pathname === Routes.CHATS || pathname === Routes.PROFILE) {
    if (!hasUser) {
      window.router.go(Routes.LOGIN);
      return false;
    }
    return true;
  }
  return true;
};

export const logout = async (): Promise<void> => {
  await authApi.logout();

  const { store } = window;
  const state = store.getState();

  if (state.socket) {
    state.socket.close();
  }
  window.router.reset();
  store.reset({ authorized: false });
  window.router.go(Routes.LOGIN);
};
