import './style.scss';
import * as Pages from './pages';
import { fields } from './pages/registration/registration.const';
import { dataFields, passwordFields } from './pages/profile/profile.const';
import Routes from './api/routes';
import router from './@core/Router';
import Store from './@core/Store';
import { DefaultAppState } from './@models/common';
import { IUserInfo } from './api/model';
import { EMPTY_STRING } from '../assets/constants/common';
import { GlobalError } from './components';

declare global {
  interface Window { store: Store<DefaultAppState>; }
}

const defaultState: DefaultAppState = {
  user: {} as IUserInfo,
  isLoading: false,
  globalError: EMPTY_STRING,
};

const store = new Store<DefaultAppState>(defaultState);
window.store = store;

const GlobalErrorComponent = new GlobalError();
const globalErrorElement = GlobalErrorComponent.getContent();
const main = document.getElementById('app');
if (main && globalErrorElement) {
  main.append(globalErrorElement);
}

router
  .use(Routes.LOGIN, Pages.LoginPage)
  .use(Routes.SIGN_IN, Pages.RegistrationPage, { fields })
  .use(Routes.PROFILE, Pages.ProfilePage)
  .use(Routes.CHATS, Pages.ChatPage)
  .start();
