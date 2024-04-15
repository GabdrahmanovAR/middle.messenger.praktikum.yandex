import { EMPTY_STRING } from '../../assets/constants/common';

export const login = (value: string): string => {
  const ONLY_DIGITS_REGEX = /^\d+$/;
  const SPEC_SYMBOLS_AND_SPACES_REGEX = /^[a-zA-Zа-яА-Я0-9_-]*$/;

  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (value.length < 3 || value.length > 20) {
    return 'Логин должен быть в диапазоне от 3 до 20 символов';
  }

  if (ONLY_DIGITS_REGEX.test(value)) {
    return 'Логин не может состоять только из цифр';
  }

  if (!SPEC_SYMBOLS_AND_SPACES_REGEX.test(value)) {
    return 'Логин не должен содержать спецсимволы или пробелы';
  }

  return EMPTY_STRING;
};

export const password = (value: string): string => {
  const CAPITAL_LETTER_REGEX = /[A-Z]/;
  const DIGIT_REGEX = /\d/;

  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен быть в диапазоне от 8 до 40 символов';
  }

  if (!CAPITAL_LETTER_REGEX.test(value)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }

  if (!DIGIT_REGEX.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  return EMPTY_STRING;
};

export const repeatPassword = (value: string | null, repeatValue: string): string => {
  if (value) {
    return value === repeatValue
      ? EMPTY_STRING
      : 'Пароли не совпадают';
  }

  return EMPTY_STRING;
};

export const email = (value: string): string => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (!EMAIL_REGEX.test(value)) {
    return 'Некорректный формат email';
  }

  return EMPTY_STRING;
};

export const phone = (value: string): string => {
  const DIGITS_ONLY_REGEX = /^\d+$/;
  const PHONE_LENGTH_REGEX = /^\d{10,15}$/;

  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (!DIGITS_ONLY_REGEX.test(value)) {
    return 'Номер телефона должен состоять только из цифр';
  }

  if (!PHONE_LENGTH_REGEX.test(value)) {
    return 'Номер телефона должен содержать от 10 до 15 цифр';
  }

  return EMPTY_STRING;
};

export const name = (value: string): string => {
  const LETTERS_AND_DASH_REGEX = /^[a-zA-Zа-яА-Я-]*$/;
  const CAPITAL_LETTER_REGEX = /^[A-ZА-Я]/;

  if (value === EMPTY_STRING) {
    return 'Необходимо заполнить поле';
  }

  if (!LETTERS_AND_DASH_REGEX.test(value)) {
    return 'Имя должно содержать только буквы, допускается дефис';
  }

  if (!CAPITAL_LETTER_REGEX.test(value)) {
    return 'Первая буква имени должна быть заглавной';
  }

  return EMPTY_STRING;
};
