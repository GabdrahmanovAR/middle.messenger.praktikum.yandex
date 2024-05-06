import { IProps } from '../common';

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
  readonly?: boolean;
}

export interface IFieldProps extends IProps {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  error?: boolean;
  validate?: (value: string) => void;
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
}

export interface IChatList {
  id: string;
  name: string;
  avatar?: string;
  message?: string;
  date?: string;
  count?: string;
  active?: boolean;
}

export interface IChatListProps extends IProps {
  chatList: IChatList[];
  fieldKeys?: string[];
  currentActive?: string;
}

export interface IChatContentProps extends IProps {
  chatInfo: IChatList;
  onModalOpen: (itemName: string) => void;
}
export interface IDropDownList {
  icon: string;
  title: string;
  name: string;
}
export interface IDropdownListProps extends IProps {
  list: IDropDownList[];
  appednTo: HTMLElement | null;
  visible?: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  onMenuItemSelect: (value: string) => void;
}

export interface IModalUser extends IProps {
  title?: string;
  fieldLabel?: string;
  buttonLabel?: string;
  visible?: boolean;
}

export interface IInputFile extends IProps {
  avatar?: boolean;
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

export interface IMessageGroup {
  group: IMessage[];
}

export interface IMessages {
  id: string;
  date: string;
  messageGroup: IMessageGroup[];
}

export interface IMessageListProps extends IProps {
  messages?: IMessages[];
}

export interface IMessageProps extends IProps {
  own?: boolean;
  first?: boolean;
  image?: string;
  message?: string;
  send?: boolean;
  delivered?: boolean;
  read?: boolean;
  date?: string;
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
  id: string;
  name: string
  active?: boolean;
  avatar?: string;
  message?: string;
  date?: string;
  count?: string;
  onClick?: (value: string | null) => void;
}
