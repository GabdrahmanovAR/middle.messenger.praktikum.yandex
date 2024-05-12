import { EMPTY_STRING } from '../../assets/constants/common';
import { ISelectedChat } from '../@models/components';
import ChatApi from '../api/chat.api';
import { IAddChatUser } from '../api/model';
import { setGlobalError } from './global-error.service';

const chatApi = new ChatApi();

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
    console.log(response);
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
    console.log(response);

    await getChats();

    if (selectedChat.id === response.result.id) {
      store.set({ selectedChat: {} as ISelectedChat });
    }
  } catch (error) {
    setGlobalError(error, 'Ошибка удаления чата');
  }
};

export const selectChat = (chat: ISelectedChat): void => {
  window.store.set({ selectedChat: chat });
};

export const addChatUser = async (data: IAddChatUser): Promise<void> => {
  await chatApi.addChatUser(data);
};
