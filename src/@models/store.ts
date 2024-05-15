import WSTransport from '../@core/WsTransport';
import { IChatInfo, IChatUser, IUserInfo } from '../api/model';
import {
  IModalUser, IModalConfirm, ISelectedChat, IModalChat,
} from './components';
import { IMessageType } from './websocket';

export interface DefaultAppState {
  user: IUserInfo;
  isLoading: boolean;
  isChatLoading: boolean;
  globalError: string;
  avatar: string;
  authorized: boolean | null;
  modalAddUser: IModalUser;
  modalRemoveUser: IModalUser;
  modalAddChat: IModalChat;
  modalConfirm: IModalConfirm;
  chats: IChatInfo[];
  selectedChat: ISelectedChat,
  selectedChatUsers: IChatUser[],
  findedUsers: IUserInfo[],
  socket: WSTransport | null,
  messages: IMessageType[],
}
