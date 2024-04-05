interface IDropDownList {
  icon: string;
  name: string;
}

export const dropDownlist: IDropDownList[] = [
  {
    icon: '/src/assets/icons/add_user.svg',
    name: 'Добавить пользователя',
  },
  {
    icon: '/src/assets/icons/delete_user.svg',
    name: 'Удалить пользователя',
  },
];

export const dropDownlist2: IDropDownList[] = [
  {
    icon: '/src/assets/icons/media.svg',
    name: 'Фото или видео',
  },
  {
    icon: '/src/assets/icons/file.svg',
    name: 'Файл',
  },
  {
    icon: '/src/assets/icons/location.svg',
    name: 'Локация',
  },
];
