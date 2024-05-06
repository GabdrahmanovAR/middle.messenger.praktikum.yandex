import router from '../@core/Router';
import AuthApi from '../api/auth.api';
import { ICreateUser, ILoginRequestData, IUserInfo } from '../api/model';
import Routes from '../api/routes';
import { isApiError } from '../utils/apiError';

const authApi = new AuthApi();

const getUser = async (): Promise<IUserInfo> => {
  const userResponse = await authApi.user();

  if (isApiError(userResponse)) {
    throw new Error(userResponse.reason);
  }

  return userResponse;
};

export const login = async (data: ILoginRequestData): Promise<void> => {
  const response = await authApi.login(data);

  if (isApiError(response)) {
    throw new Error(response.reason);
  }

  window.store.set({ isLoading: true });
  try {
    const user = await getUser();
    console.log(response);
    console.log(user);
  } catch (error) {
    console.log(error);
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
