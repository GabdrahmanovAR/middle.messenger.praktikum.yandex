import './style.scss';
import * as Pages from './pages';
import Router from './@core/Router';
import Routes from './api/routes';
import Store from './@core/Store';
import { IUserInfo } from './api/model';
import { EMPTY_STRING } from '../assets/constants/common';
import { GlobalError } from './components';
import { canActivate } from './services/auth.service';
import { DefaultAppState } from './@models/store';
import {
  IModalAddUser, IModalConfirm, ISelectedChat, IModalChat,
  IModalRemoveUser,
} from './@models/components';
import { handleUnhandledErrors } from './services/global-error.service';

declare global {
  interface Window {
    store: Store<DefaultAppState>;
    router: Router;
  }
}

export const defaultState: DefaultAppState = {
  user: {} as IUserInfo,
  isLoading: false,
  isChatLoading: false,
  globalError: EMPTY_STRING,
  avatar: EMPTY_STRING,
  authorized: null,
  modalAddUser: {} as IModalAddUser,
  modalConfirm: {} as IModalConfirm,
  modalAddChat: {} as IModalChat,
  modalRemoveUser: {} as IModalRemoveUser,
  chats: [],
  selectedChat: {} as ISelectedChat,
  selectedChatUsers: [],
  findedUsers: [],
  socket: null,
  messages: [],
};

const store = new Store<DefaultAppState>(defaultState);
window.store = store;

const GlobalErrorComponent = new GlobalError();
const globalErrorElement = GlobalErrorComponent.getContent();
const main = document.getElementById('app');
if (main && globalErrorElement) {
  main.append(globalErrorElement);
}

handleUnhandledErrors();

const router = new Router('main#app', canActivate);
window.router = router;

router
  .use(Routes.LOGIN, Pages.LoginPage)
  .use(Routes.SIGN_UP, Pages.RegistrationPage)
  .use(Routes.PROFILE, Pages.ProfilePage)
  .use(Routes.CHATS, Pages.ChatPage)
  .use('*', Pages.NotFoundPage)
  .start();
