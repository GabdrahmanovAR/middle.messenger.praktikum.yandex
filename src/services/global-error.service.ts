import { EMPTY_STRING } from '../../assets/constants/common';
import { isApiError } from '../utils/type-check';

export const setGlobalError = (error: unknown, message = 'Ошибка запроса'): void => {
  if (isApiError(error)) {
    message = error.reason;
  }
  window.store.set({ globalError: message });
};

export const clearGlobalError = (): void => {
  window.store.set({ globalError: EMPTY_STRING });
};
