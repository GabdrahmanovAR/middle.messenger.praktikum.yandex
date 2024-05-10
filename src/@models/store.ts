import { IChatInfo, IUserInfo } from '../api/model';
import { IModalChat } from './components';

export interface DefaultAppState {
  user: IUserInfo;
  isLoading: boolean;
  globalError: string;
  avatar: string;
  authorized: boolean | null;
  modalState: IModalChat;
  chats: IChatInfo[];
}
