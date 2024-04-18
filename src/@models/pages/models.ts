import { IProps } from '../common';

export interface ILoginPageProps extends IProps {
}

export interface ILoginField {
  label: string;
  type: string;
  required: boolean;
  name: string;
  validate?: (value: string) => string,
}
export interface IRegistrationPageProps extends IProps {
  fields: ILoginField[],
  fieldKeys: string[];
}
