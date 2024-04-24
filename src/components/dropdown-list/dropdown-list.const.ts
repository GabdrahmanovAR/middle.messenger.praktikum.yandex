import { IDropDownList } from '../../@models/components';

export const propertiesDropdownList: IDropDownList[] = [
  {
    icon: '/assets/icons/add_user.svg',
    title: 'Добавить пользователя',
    name: 'add',
  },
  {
    icon: '/assets/icons/delete_user.svg',
    title: 'Удалить пользователя',
    name: 'remove',
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
