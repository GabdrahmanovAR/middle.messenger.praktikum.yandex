interface IDataField {
  label: string;
  value: string;
  type: string;
  name: string;
  edit?: boolean;
  direction?: string;
}

export const userData: IDataField[] = [
  {
    label: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'email',
    name: 'email',
    direction: 'right',
  },
  {
    label: 'Логин',
    value: 'ivanivanov',
    type: 'text',
    name: 'login',
    direction: 'right',
  },
  {
    label: 'Имя',
    value: 'Иван',
    type: 'text',
    name: 'first_name',
    direction: 'right',
  },
  {
    label: 'Фамилия',
    value: 'Иванов',
    type: 'text',
    name: 'second_name',
    direction: 'right',
  },
  {
    label: 'Имя в чате',
    value: 'Иван',
    type: 'text',
    name: 'display_name',
    direction: 'right',
  },
  {
    label: 'Телефон',
    value: '+7 (909) 967 30 30',
    type: 'text',
    name: 'phone',
    direction: 'right',
  },
];
export const changePassword: IDataField[] = [
  {
    label: 'Старый пароль',
    value: 'паролька',
    type: 'password',
    name: 'oldPassword',
    edit: true,
    direction: 'right',
  },
  {
    label: 'Новый пароль',
    value: 'паролька1',
    type: 'password',
    name: 'newPassword',
    edit: true,
    direction: 'right',
  },
  {
    label: 'Повторите новый пароль',
    value: 'паролька1',
    type: 'password',
    name: 'repeatPassword',
    edit: true,
    direction: 'right',
  },
];
