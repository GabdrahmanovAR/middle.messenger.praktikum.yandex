import HTTPTransport from '../@core/HttpTransport';
import {
  IAPIError, IAddChatUser, IChatInfo, IChatToken, IChatUnread, IChatUser, ICreateChat, ICreateChatResponse, IDeleteChat, IDeleteChatResponse,
} from './model';

const chatApi = new HTTPTransport();

export default class ChatApi {
  async getChats(): Promise<IChatInfo[]> {
    return chatApi.get<IChatInfo[]>('/chats');
  }

  async createChat(data: ICreateChat): Promise<ICreateChatResponse | IAPIError> {
    return chatApi.post('/chats', { data });
  }

  async deleteChat(data: IDeleteChat): Promise<IDeleteChatResponse> {
    return chatApi.delete('/chats', { data });
  }

  async getChatUsers(chatId: number): Promise<IChatUser[]> {
    return chatApi.get(`/chats/${chatId}/users`);
  }

  async getChatUnreadMessagesCount(chatId: number): Promise<IChatUnread> {
    return chatApi.get(`/chats/new/${chatId}`);
  }

  async addChatUser(data: IAddChatUser): Promise<void | IAPIError> {
    return chatApi.put('/chats/users', { data });
  }

  async updateAvatar(data: FormData): Promise<IChatInfo | IAPIError> {
    return chatApi.put('/chats/avatar', { data });
  }

  async removeChatUser(data: IAddChatUser): Promise<void | IAPIError> {
    return chatApi.delete('/chats/users', { data });
  }

  async getChatToken(chatId: number): Promise<IChatToken> {
    return chatApi.post(`/chats/token/${chatId}`);
  }
}
