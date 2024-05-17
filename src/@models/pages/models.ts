import Block from '../../@core/Block';
import { IChatInfo, IUserInfo } from '../../api/model';
import { IProps } from '../common';
import { IFieldProps } from '../components';

export interface ILoginPageProps extends IProps {}

export interface IField {
  label: string;
  type: string;
  required: boolean;
  name: string;
  validate?: (value: string) => string,
}
export interface IRegistrationPageProps extends IProps {
  inputFields: Block<IFieldProps>[];
}

export interface IChatPageProps extends IProps {
  chats: IChatInfo[];
}

export interface IProfileField {
  label: string;
  value: string;
  type: string;
  name: string;
  readonly?: boolean;
  validate?: (value: string) => string;
  last?: boolean;
}
export interface IProfilePageProps extends IProps {
  user: IUserInfo;
  dataFields: Block[];
  passwordFields: Block[];
  edit?: boolean;
  editPassword?: boolean;
}
