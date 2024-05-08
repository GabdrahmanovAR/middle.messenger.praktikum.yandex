import { IProfileField } from '../../@models/pages';
import * as validate from '../../utils/validate';

export const dataFields: IProfileField[] = [
  {
    label: 'Почта',
    value: '',
    type: 'email',
    name: 'email',
    validate: validate.email,
    readonly: true,
  },
  {
    label: 'Логин',
    value: '',
    type: 'text',
    name: 'login',
    validate: validate.login,
    readonly: true,
  },
  {
    label: 'Имя',
    value: '',
    type: 'text',
    name: 'first_name',
    validate: validate.name,
    readonly: true,
  },
  {
    label: 'Фамилия',
    value: '',
    type: 'text',
    name: 'second_name',
    validate: validate.name,
    readonly: true,
  },
  {
    label: 'Имя в чате',
    value: '',
    type: 'text',
    name: 'display_name',
    validate: validate.empty,
    readonly: true,
  },
  {
    label: 'Телефон',
    value: '',
    type: 'text',
    name: 'phone',
    validate: validate.phone,
    last: true,
    readonly: true,
  },
];
export const passwordFields: IProfileField[] = [
  {
    label: 'Старый пароль',
    value: '',
    type: 'password',
    name: 'oldPassword',
    validate: validate.empty,
  },
  {
    label: 'Новый пароль',
    value: '',
    type: 'password',
    name: 'newPassword',
    validate: validate.password,
  },
  {
    label: 'Повторите новый пароль',
    value: '',
    type: 'password',
    name: 'repeatPassword',
  },
];
