import { EMPTY_STRING } from '../../assets/constants/common';

export const getLocaleTime = (iso: string): string => {
  const date = new Date(iso);
  if (date) {
    const result = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    return result;
  }
  return EMPTY_STRING;
};
