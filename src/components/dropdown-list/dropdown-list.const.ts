import { IDropDownItems, IDropDownList } from '../../@models/components';

export enum Modal {
  ADD_USER = 'addUser',
  REMOVE_USER = 'removeUser',
  ADD_CHAT = 'addChat',
  REMOVE_CHAT = 'removeChat',
  LEAVE_CHAT = 'leaveChat',
}

export const chatPropertiesDropDown: IDropDownItems = {
  addUser: {
    icon: '/assets/icons/add.svg',
    title: 'Добавить пользователя',
    name: Modal.ADD_USER,
    modalDescription: {
      title: 'Добавить пользователя',
      fieldLabel: 'Логин',
      fieldName: Modal.ADD_USER,
      buttonLabel: 'Добавить',
      name: Modal.ADD_USER,
      visible: true,
    },
  },
  removeUser: {
    icon: '/assets/icons/delete.svg',
    title: 'Удалить пользователя',
    name: Modal.REMOVE_USER,
    modalDescription: {
      title: 'Удалить пользователя',
      visible: true,
    },
  },
  removeChat: {
    icon: '/assets/icons/delete.svg',
    title: 'Удалить чат',
    name: Modal.REMOVE_CHAT,
    modalDescription: {
      title: 'Удаление чата',
      text: 'Вы собираетесь удалить чат. Все сообщения и история чата будут удалены. Продолжить?',
      visible: true,
    },
  },
  leaveChat: {
    icon: '/assets/icons/delete.svg',
    title: 'Покинуть группу',
    name: Modal.LEAVE_CHAT,
    modalDescription: {
      title: 'Выход из группы',
      text: 'Вы собираетесь выйти из группы. Продолжить?',
      visible: true,
    },
  },
};

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
