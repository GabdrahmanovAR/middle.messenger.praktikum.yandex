import { IModalChat, IModalConfirm } from '../@models/components';

export const openModal = (state: IModalChat): void => {
  window.store.set({
    modalState: { ...state },
  });
};

export const openConfirmModal = (state: IModalConfirm): void => {
  window.store.set({
    modalConfirm: { ...state },
  });
};

export const closeModal = (): void => {
  window.store.set({ modalState: { visible: false } as IModalChat });
};

export const closeConfirmModal = (): void => {
  window.store.set({ modalConfirm: { visible: false } as IModalConfirm });
};
