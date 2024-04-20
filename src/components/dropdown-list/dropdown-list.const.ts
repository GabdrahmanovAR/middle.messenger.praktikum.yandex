export interface IDropDownList {
  icon: string;
  name: string;
}

export const propertiesDropdownList: IDropDownList[] = [
  {
    icon: '/assets/icons/add_user.svg',
    name: 'Добавить пользователя',
  },
  {
    icon: '/assets/icons/delete_user.svg',
    name: 'Удалить пользователя',
  },
];

export const pinDropdownList: IDropDownList[] = [
  {
    icon: '/assets/icons/media.svg',
    name: 'Фото или видео',
  },
  {
    icon: '/assets/icons/file.svg',
    name: 'Файл',
  },
  {
    icon: '/assets/icons/location.svg',
    name: 'Локация',
  },
];
