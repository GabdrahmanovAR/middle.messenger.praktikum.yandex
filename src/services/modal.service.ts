import { IModalChat } from '../@models/components';

export const openModal = (state: IModalChat): void => {
  window.store.set({
    modalState: { ...state },
  });
};

export const closeModal = (): void => {
  window.store.set({ modalState: { visible: false } as IModalChat });
};
