import Block from '../../@core/Block';
import WSTransport from '../../@core/WsTransport';
import { IChatUser, IUserInfo } from '../../api/model';
import { IProps } from '../common';
import { IMessageType } from '../websocket';

export interface IInputProps extends IProps {
  type: string;
  classes?: string;
  name: string;
  id?: string;
  accept?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: () => void;
  onClick?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
  onEnter?: (event: Event) => void;
  readonly?: boolean;
  withDelay?: boolean;
}

export interface IFieldProps extends IProps {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  error?: boolean;
  validate?: (value: string) => void;
  onInput?: (value: string) => void;
}

export interface IInputDropDownProps extends IProps {
  type: string;
  label: string;
  name: string;
  titleField: string;
  valueField: string;
  required?: boolean;
  error?: boolean;
  listItems?: IDropDownList[];
  validate?: (value: string) => void;
  onInput?: (value: string) => void;
  onMenuItemSelect?: (data: unknown) => void;
}

export interface IErrorLineProps extends IProps {
  classes: string;
  error?: string;
}

export interface IButtonProps extends IProps {
  type: string;
  isRectangle?: boolean;
  isLink?: boolean;
  isRound?: boolean;
  label?: string;
  icon?: string;
  theme?: string;
  isLoading?: boolean;
  onClick?: (event: Event) => void;
}

export interface IInputTextProps extends IProps {
  name: string;
  rounded?: boolean;
  center?: boolean;
  placeholder?: string;
  icon?: string;
  onSearch?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export interface IChatListProps extends IProps {
  chatList: Block[];
  showList: boolean;
  isLoading?: boolean;
  currentActive?: string;
}

export interface IChatContentProps extends IProps {
  showChat?: boolean;
  selectedChat?: ISelectedChat;
  user?: IUserInfo;
  socket?: WSTransport | null;
}
export interface IDropDownList {
  icon: string;
  title: string;
  name: string;
  readonly?: boolean;
  onClick?: () => void;
}
export interface IDropdownListProps extends IProps {
  list: IDropDownList[];
  appednTo: HTMLElement | null;
  visible?: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  onMenuItemSelect?: (value: string) => void;
}

export interface IModalChat extends IProps {
  title?: string;
  fieldLabel?: string;
  fieldName?: string;
  buttonLabel?: string;
  visible?: boolean;
  findedUsers?: IUserInfo[];
  name: string;
  onClick?: (value: string) => void;
}

export interface IModalConfirm extends IProps {
  title: string;
  text: string;
  visible?: boolean;
  onConfirm?: () => void;
}

export interface IInputFile extends IProps {
  avatar?: string;
  isFile?: boolean;
  acceptType?: string;
  label?: string;
  fileName?: string;
  file?: File;
  onClick?: (event: Event) => void;
}

export interface IModalProfileProps extends IProps {
  error?: boolean;
  success?: boolean;
  visible?: boolean;
  title: string;
}

export interface IErrorInfoProps extends IProps {
  code: string;
  info: string;
}

export interface IMessage {
  message?: string;
  own?: boolean;
  read?: boolean;
  delivered?: boolean;
  send?: boolean;
  image?: string;
  date: string;
}

// export interface IMessageGroup {
//   group: IMessage[];
// }

// export interface IMessages {
//   id: string;
//   date: string;
//   messageGroup: IMessageGroup[];
// }

export interface IMessageListProps extends IProps {
  messages?: IMessageType[];
  messageList?: Block[];
  user?: IUserInfo;
  selectedChatUsers: IChatUser[];
  empty?: boolean;
}

export interface IMessageProps extends IProps {
  own?: boolean;
  first?: boolean;
  image?: string;
  message: string;
  send?: boolean;
  delivered?: boolean;
  read?: boolean;
  date: string;
  name?: string;
}

export interface IDataFieldProps extends IProps {
  type: string;
  label: string;
  value: string;
  name: string;
  readonly?: boolean;
  last?: boolean;
  validate?: (value: string) => void;
  onEditStateChange?: (state: boolean) => void;
  onValueChange?: () => void;
}

export interface IChatCardProps extends IProps {
  id: number;
  name: string
  active?: boolean;
  avatar?: string;
  message?: string;
  userMessage?: string;
  date?: string;
  count?: number;
  createdBy: number;
  selectedChat?: ISelectedChat;
  onClick?: (value: number | null) => void;
}

export interface ISelectedChat {
  id: number;
  title: string;
  avatar: string;
  createdBy: number;
}

export interface IGlobalErrorProps extends IProps {
  closeIcon?: string;
  globalError?: string;
}
