import { EMPTY_STRING } from '../../assets/constants/common';

export const clearGlobalError = (): void => {
  window.store.set({ globalError: EMPTY_STRING });
};
