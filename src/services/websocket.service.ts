import { EMPTY_STRING } from '../../assets/constants/common';
import WSTransport from '../@core/WsTransport';
import { IMessageType } from '../@models/websocket';
import { WEBSOCKET_HOST } from '../constants';
import { getChatToken, updateChatCardLastMessage } from './chat.service';
import { setGlobalError } from './global-error.service';

// TODO перенести в chatService
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

export const showMessage = (messageContent: IMessageType | IMessageType[], chatId?: number): void => {
  const { store } = window;
  const state = store.getState();
  const { messages } = state;
  const newMessages = [];

  let userId = null;
  let chatLastMessage = EMPTY_STRING;

  if (Array.isArray(messageContent)) {
    newMessages.push(...messageContent);
  } else {
    newMessages.push(messageContent);
    chatLastMessage = messageContent.content;
    userId = messageContent.user_id;
  }

  if (chatLastMessage !== EMPTY_STRING && chatId && userId) {
    updateChatCardLastMessage(chatId, userId, chatLastMessage);
  }
  store.set({ messages: [...newMessages, ...messages] });
};
