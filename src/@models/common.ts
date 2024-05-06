import { IUserInfo } from '../api/model';

export type DocumentEventMapKey = keyof DocumentEventMap;
export type TEvents = {
  [key in DocumentEventMapKey]?: EventListenerOrEventListenerObject;
};

export interface IProps {
  events?: TEvents,
  [key: string]: unknown;
}

export interface DefaultAppState {
  user: IUserInfo;
  isLoading: boolean;
  globalError: string;
}
