import { EMPTY_STRING } from '../../assets/constants/common';
import { ISelectedChat } from '../@models/components';
import { IMessageType } from '../@models/websocket';
import ChatApi from '../api/chat.api';
import {
  IAddChatUser, IChatInfo, IChatLastMessageUser, IChatToken, IChatUser,
} from '../api/model';
import { empty } from '../utils/empty';
import { setGlobalError } from './global-error.service';

const chatApi = new ChatApi();

export const getSelectedChatId = (): number | null => {
  const state = window.store.getState();
  const { selectedChat } = state;

  if (!empty(selectedChat)) {
    return selectedChat.id;
  }
  return null;
};

export const getChats = async (): Promise<void> => {
  try {
    const chats = await chatApi.getChats();
    window.store.set({ chats });
  } catch (error) {
    setGlobalError(error, 'Ошибка получения списка чатов');
  }
};

export const createChat = async (title: string): Promise<void> => {
  try {
    const response = await chatApi.createChat({ title });
    await getChats();
  } catch (error) {
    setGlobalError(error, 'Ошибка создания чата');
  }
};

export const deleteChat = async (): Promise<void> => {
  const { store } = window;
  const state = store.getState();
  const { selectedChat } = state;

  if (!selectedChat.id) {
    setGlobalError(EMPTY_STRING, 'Отсутствует идентификатор чата. Удаление не возможно');
    return;
  }

  try {
    const response = await chatApi.deleteChat({ chatId: selectedChat.id });
    await getChats();

    if (selectedChat.id === response.result.id) {
      store.set({ selectedChat: {} as ISelectedChat, selectedChatUsers: [] });
    }
  } catch (error) {
    setGlobalError(error, 'Ошибка удаления чата');
  }
};

export const removeChatFromList = (chatId: number): void => {
  const { store } = window;
  const state = store.getState();
  const { selectedChat, chats } = state;
  const updatedChats = [...chats];

  if (!empty(selectedChat) && selectedChat.id === chatId) {
    store.set({ selectedChat: {} as ISelectedChat, selectedChatUsers: [] });
  }

  if (empty(updatedChats)) {
    return;
  }
  const chatIndex = updatedChats.findIndex((chat: IChatInfo) => chat.id === chatId);

  if (chatIndex !== -1) {
    updatedChats.splice(chatIndex, 1);

    store.set({ chats: updatedChats });
  }
};

export const getChatUsers = async (chatId: number): Promise<IChatUser[]> => chatApi.getChatUsers(chatId);

export const addChatUser = async (data: IAddChatUser): Promise<void> => {
  const { store } = window;
  const state = store.getState();
  const { selectedChatUsers } = state;

  const hasUser = selectedChatUsers.some((newUser: IChatUser) => data.users.some((userId: number) => userId === newUser.id));

  if (hasUser) {
    setGlobalError({}, 'Пользователь уже добавлен в чат');
    return;
  }

  try {
    await chatApi.addChatUser(data);
    const users = await getChatUsers(data.chatId);
    store.set({ selectedChatUsers: users });
  } catch (error) {
    setGlobalError(error, 'Во время добавления пользователя в чат,  произошла неизвестная ошибка');
  }
};

export const removeChatUser = async (chatId: number | undefined, userId: number | undefined): Promise<void> => {
  if (!chatId || !userId) {
    const idError = 'Отсутствует идентификатор чата/пользователя. Удаление пользователя остановлено.';
    setGlobalError({}, idError);
    return;
  }

  const data: IAddChatUser = {
    chatId,
    users: [userId],
  };
  try {
    await chatApi.removeChatUser(data);

    const selectedChatUsers = await getChatUsers(chatId);
    const { store } = window;

    if (selectedChatUsers) {
      store.set({ selectedChatUsers });
    }
  } catch (error) {
    setGlobalError(error, 'Ошибка удаления пользователя из чата');
  }
};

export const leaveChat = async (chatId: number, userId: number): Promise<void> => {
  try {
    const data: IAddChatUser = {
      chatId,
      users: [userId],
    };
    await chatApi.removeChatUser(data);
  } catch (error) {
    setGlobalError(error, 'При выходе из чата произошла неизвестная ошибка');
  }
};

export const getChatToken = async (chatId: number): Promise<IChatToken> => chatApi.getChatToken(chatId);

export const selectChat = async (chat: ISelectedChat): Promise<void> => {
  const { store } = window;
  const state = store.getState();
  const currentSelectedChatId = state.selectedChat?.id;

  if (currentSelectedChatId && currentSelectedChatId === chat.id) {
    return;
  }

  store.set({ isLoading: true, selectedChat: chat });

  try {
    const users = await getChatUsers(chat.id);
    store.set({ selectedChatUsers: users });
  } catch (error) {
    setGlobalError(error);
  } finally {
    store.set({ isLoading: false });
  }
};

export const setCardLastMessageUserName = (chat: IChatInfo): string => {
  const { store } = window;
  const state = store.getState();
  const { user } = state;

  const chatLastMessageUserName = chat.last_message?.user?.first_name;

  if (!chatLastMessageUserName) {
    return EMPTY_STRING;
  }

  return chatLastMessageUserName === user.first_name ? 'Вы' : chatLastMessageUserName;
};

export const updateChatCardLastMessage = (chatId: number, userId: number, content: string): void => {
  const { store } = window;
  const { chats, selectedChatUsers } = store.getState();
  const copyChats = [...JSON.parse(JSON.stringify(chats))];
  const chatIndex = copyChats.findIndex((chat: IChatInfo) => chat.id === chatId);
  const contentUser = selectedChatUsers.find((user: IChatUser) => user.id === userId);

  if (chatIndex === -1 || !contentUser) {
    return;
  }

  const lastMessage = chats[chatIndex].last_message;
  if (lastMessage) {
    const user: IChatLastMessageUser = {
      phone: EMPTY_STRING,
      email: EMPTY_STRING,
      login: contentUser.login,
      first_name: contentUser.first_name,
      second_name: contentUser.second_name,
      avatar: contentUser.avatar,
    };
    const updatedObject: IChatInfo = {
      ...chats[chatIndex],
      last_message: {
        ...lastMessage,
        user,
        content,
      },
    };
    copyChats.splice(chatIndex, 1, updatedObject);
    store.set({ chats: [...copyChats] });
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

export const checkActive = (chatId: number): boolean => {
  if (Number.isNaN(chatId)) {
    return false;
  }

  const { store } = window;
  const { selectedChat } = store.getState();

  if (empty(selectedChat)) {
    return false;
  }

  if (selectedChat.id === chatId) {
    return true;
  }

  return false;
};
