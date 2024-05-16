import {
  IModalUser, IModalConfirm, IModalChat, IModalRemoveUser,
} from '../@models/components';

export const openAddUserModal = (state: IModalUser): void => {
  window.store.set({
    modalAddUser: { ...state },
  });
};

export const openRemoveUserModal = (data: IModalRemoveUser): void => {
  const { store } = window;
  const state = store.getState();
  const { selectedChatUsers } = state;
  data.selectedChatUsers = [...selectedChatUsers];

  window.store.set({
    modalRemoveUser: { ...data },
  });
};

export const openAddChatModal = (state: IModalChat): void => {
  window.store.set({
    modalAddChat: { ...state },
  });
};

export const openConfirmModal = (state: IModalConfirm): void => {
  window.store.set({
    modalConfirm: { ...state },
  });
};

export const closeModal = (): void => {
  window.store.set({
    modalAddUser: { visible: false } as IModalUser,
    findedUsers: [],
  });
};

export const closeAddChatModal = (): void => {
  window.store.set({ modalAddChat: { visible: false } });
};

export const closeRemoveUserModal = (): void => {
  window.store.set({ modalRemoveUser: { visible: false } });
};

export const closeConfirmModal = (): void => {
  window.store.set({ modalConfirm: { visible: false } as IModalConfirm });
};
