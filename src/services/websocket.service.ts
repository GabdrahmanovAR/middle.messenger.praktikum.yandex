import { EMPTY_STRING } from '../../assets/constants/common';
import WSTransport from '../@core/WsTransport';
import { WEBSOCKET_HOST } from '../constants';
import { getChatToken } from './chat.service';
import { setGlobalError } from './global-error.service';

export const createWebSocket = async (): Promise<void> => {
  const { store } = window;
  const state = store.getState();
  const chatId = state.selectedChat.id;
  const userId = state.user.id;
  const currentConnection = state.chatConnection;

  if (!chatId || !userId) {
    const message = 'Ошибка подключения к чату. Отсутствует идентификатор чата или пользователя';
    setGlobalError(EMPTY_STRING, message);
    return;
  }

  const token = await getChatToken(chatId);

  if (!token) {
    const tokenError = 'Токен не получен, подключение не возможно';
    setGlobalError(EMPTY_STRING, tokenError);
    return;
  }

  if (currentConnection) {
    currentConnection.close();
  }
  const socket = new WSTransport(`${WEBSOCKET_HOST}/${userId}/${chatId}/${token.token}`);
  await socket.connect();
  socket.send({ content: '0', type: 'get old' });
  store.set({ chatConnection: socket });
};

export const sendMessage = (data: string): void => {
  const { store } = window;
  const state = store.getState();
  const socket = state.chatConnection;

  if (socket) {
    socket.send({ content: data, type: 'message' });
  }
};
