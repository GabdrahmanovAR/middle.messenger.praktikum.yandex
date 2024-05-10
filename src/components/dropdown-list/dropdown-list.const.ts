import { IDropDownList, IModalChat } from '../../@models/components';
import { openModal } from '../../services/modal.service';

export enum Modal {
  ADD_USER = 'add-user',
  REMOVE_USER = 'remove-user',
  ADD_CHAT = 'add-chat',
  REMOVE_CHAT = 'remove-chat',
}

export const propertiesDropdownList: IDropDownList[] = [
  {
    icon: '/assets/icons/add_user.svg',
    title: 'Добавить пользователя',
    name: Modal.ADD_USER,
    onClick: (): void => {
      const modalState: IModalChat = {
        title: 'Добавить пользователя',
        fieldLabel: 'Логин',
        fieldName: Modal.ADD_USER,
        buttonLabel: 'Добавить',
        name: Modal.ADD_USER,
        visible: true,
      };
      openModal(modalState);
    },
  },
  {
    icon: '/assets/icons/delete_user.svg',
    title: 'Удалить пользователя',
    name: Modal.REMOVE_USER,
    onClick: (): void => {
      const modalState: IModalChat = {
        title: 'Удалить пользователя',
        fieldLabel: 'Логин',
        fieldName: Modal.REMOVE_USER,
        buttonLabel: 'Удалить',
        name: Modal.ADD_USER,
        visible: true,
      };
      openModal(modalState);
    },
  },
];

export const chatDropdownList: IDropDownList[] = [
  {
    icon: '/assets/icons/add_user.svg',
    title: 'Добавить чат',
    name: Modal.ADD_CHAT,
  },
  {
    icon: '/assets/icons/delete_user.svg',
    title: 'Удалить чат',
    name: Modal.REMOVE_CHAT,
  },
];

export const pinDropdownList: IDropDownList[] = [
  {
    icon: '/assets/icons/media.svg',
    title: 'Фото или видео',
    name: 'media',
  },
  {
    icon: '/assets/icons/file.svg',
    title: 'Файл',
    name: 'file',
  },
  {
    icon: '/assets/icons/location.svg',
    title: 'Локация',
    name: 'location',
  },
];
