import WSTransport from '../@core/WsTransport';
import { IChatInfo, IChatUser, IUserInfo } from '../api/model';
import { IModalChat, IModalConfirm, ISelectedChat } from './components';
import { IMessageType } from './websocket';

export interface DefaultAppState {
  user: IUserInfo;
  isLoading: boolean;
  isChatLoading: boolean;
  globalError: string;
  avatar: string;
  authorized: boolean | null;
  modalState: IModalChat;
  modalConfirm: IModalConfirm;
  chats: IChatInfo[];
  selectedChat: ISelectedChat,
  selectedChatUsers: IChatUser[],
  findedUsers: IUserInfo[],
  socket: WSTransport | null,
  messages: IMessageType[],
}
