import ChatApi from '../api/chat.api';
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
