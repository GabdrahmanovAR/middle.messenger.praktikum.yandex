export interface IAPIError {
  reason: string;
}

export interface ISignUpResponse {
  id: number;
}

export interface IUserInfo {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface ICreateUser extends Omit<IUserInfo, 'avatar' | 'display_name' | 'id'> {
  password: string;
}

export interface IUpdateUser extends Omit<IUserInfo, 'avatar' | 'id'> {}

export interface IChatLastMessageUser extends Omit<IUserInfo, 'display_name' | 'id'> {}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IFindUser {
  login: string;
}

export interface IFileInfo {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface ICreateChat {
  title: string;
}

export interface ILoginRequestData {
  login: string;
  password: string;
}

export interface ILastMessage {
  user: IChatLastMessageUser;
  time: string;
  content: string
}

export interface IChatInfo {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: ILastMessage | null;
  created_by: number;
}

export interface ICreateChatResponse {
  id: number;
}

export interface IDeleteChat {
  chatId: number;
}

export interface IDeleteChatResponse {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number
  }
}

export interface IChatUser extends Omit<IUserInfo, 'phone' | 'email'> {
  role: string;
}

export interface IChatUnread {
  unread_count: number;
}

export interface IAddChatUser {
  users: number[];
  chatId: number;
}

export interface IChatToken {
  token: string;
}
