import { IField } from '../../@models/pages';
import * as validate from '../../utils/validate';

export const fields: IField[] = [
  {
    label: 'Почта', type: 'input', name: 'email', required: true, validate: validate.email,
  },
  {
    label: 'Логин', type: 'input', name: 'login', required: true, validate: validate.email,
  },
  {
    label: 'Имя', type: 'input', name: 'first_name', required: true, validate: validate.name,
  },
  {
    label: 'Фамилия', type: 'input', name: 'second_name', required: true, validate: validate.name,
  },
  {
    label: 'Телефон', type: 'input', name: 'phone', required: true, validate: validate.phone,
  },
  {
    label: 'Пароль', type: 'password', name: 'password', required: true, validate: validate.password,
  },
  {
    label: 'Пароль (еще раз)', name: 'repeat_password', type: 'password', required: true,
  },
];
