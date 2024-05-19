export type WebSocketText = {
  content: string,
  type: string,
};

export interface IChatFile {
  id: number,
  user_id: number,
  path: string,
  filename: string,
  content_type: string,
  content_size: number,
  upload_date: string,
}

export interface IMessageType {
  content: string;
  id: number;
  time: string;
  type: string;
  user_id: number;
  chat_id?: number;
  file?: IChatFile | null;
  is_read?: boolean;
}
