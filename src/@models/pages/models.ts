import { IUserInfo } from '../../api/model';
import { IProps } from '../common';
import { IErrorInfoProps } from '../components';

export interface ILoginPageProps extends IProps {
}

export interface IField {
  label: string;
  type: string;
  required: boolean;
  name: string;
  validate?: (value: string) => string,
}
export interface IRegistrationPageProps extends IProps {
  fields: IField[],
  fieldKeys: string[];
}

export interface IChatPageProps extends IProps {}

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
  // dataFields: IProfileField[];
  dataFieldKeys: string[];
  // passwordFields: IProfileField[];
  passwordFieldKeys: string[];
  edit?: boolean;
  editPassword?: boolean;
}
