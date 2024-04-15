import { EMPTY_STRING } from '../../assets/constants/common';

export const login = (value: string): string => {
  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (value.length < 3 || value.length > 20) {
    return 'Логин должен быть в диапазоне от 3 до 20 символов';
  }

  if (/^\d+$/.test(value)) {
    return 'Логин не может состоять только из цифр';
  }

  if (!/^[a-zA-Zа-яА-Я0-9_-]*$/.test(value)) {
    return 'Логин не должен содержать спецсимволы или пробелы';
  }

  return '';
};

export const password = (value: string): string => {
  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен быть в диапазоне от 8 до 40 символов';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }

  if (!/\d/.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  return '';
};
