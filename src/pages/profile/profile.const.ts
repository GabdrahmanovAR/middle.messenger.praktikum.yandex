import * as validate from '../../utils/validate';

export interface IProfileField {
  label: string;
  value: string;
  type: string;
  name: string;
  readonly?: boolean;
  validate?: (value: string) => string;
  last?: boolean;
}

export const dataFields: IProfileField[] = [
  {
    label: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'email',
    name: 'email',
    validate: validate.email,
    readonly: true,
  },
  {
    label: 'Логин',
    value: 'ivanivanov',
    type: 'text',
    name: 'login',
    validate: validate.login,
    readonly: true,
  },
  {
    label: 'Имя',
    value: 'Иван',
    type: 'text',
    name: 'first_name',
    validate: validate.name,
    readonly: true,
  },
  {
    label: 'Фамилия',
    value: 'Иванов',
    type: 'text',
    name: 'second_name',
    validate: validate.name,
    readonly: true,
  },
  {
    label: 'Имя в чате',
    value: 'Иван',
    type: 'text',
    name: 'display_name',
    validate: validate.empty,
    readonly: true,
  },
  {
    label: 'Телефон',
    value: '+7 (909) 967 30 30',
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
    value: 'паролька',
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
