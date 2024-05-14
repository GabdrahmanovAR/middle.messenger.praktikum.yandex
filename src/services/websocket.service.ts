import { EMPTY_STRING } from '../../assets/constants/common';
import WSTransport from '../@core/WsTransport';
import { IMessageType } from '../@models/websocket';
import { WEBSOCKET_HOST } from '../constants';
import { getChatToken } from './chat.service';
import { setGlobalError } from './global-error.service';

export const createWebSocket = async (): Promise<WSTransport | null> => {
  const { store } = window;
  const state = store.getState();
  const chatId = state.selectedChat.id;
  const userId = state.user.id;
  const currentSocket = state.socket;

  store.set({ isChatLoading: true, messages: [] });

  if (!chatId || !userId) {
    const message = 'Ошибка подключения к чату. Отсутствует идентификатор чата или пользователя';
    setGlobalError(EMPTY_STRING, message);
    store.set({ socket: null, isChatLoading: false });
    return null;
  }

  const token = await getChatToken(chatId);

  if (!token) {
    const tokenError = 'Токен не получен, подключение не возможно';
    setGlobalError(EMPTY_STRING, tokenError);
    store.set({ socket: null, isChatLoading: false });
    return null;
  }

  if (currentSocket) {
    currentSocket.close();
  }
  const socket = new WSTransport(`${WEBSOCKET_HOST}/${userId}/${chatId}/${token.token}`);
  await socket.connect();
  socket.send({ content: '0', type: 'get old' });
  store.set({ socket, isChatLoading: false });

  return socket;
};

export const sendMessage = (data: string): void => {
  const { store } = window;
  const state = store.getState();
  const { socket } = state;

  if (socket) {
    socket.send({ content: data, type: 'message' });
  }
};

export const showMessage = (message: IMessageType | IMessageType[]): void => {
  const { store } = window;
  const state = store.getState();
  const { messages } = state;
  const newMessages = [];

  // TODO добавить обновление вида карточки в соответствии с последним отправленным сообщением
  if (Array.isArray(message)) {
    newMessages.push(...message);
  } else {
    newMessages.push(message);
  }

  store.set({ messages: [...newMessages, ...messages] });
};
