interface IList {
  name?: string;
  avatar?: string;
  message?: string;
  date?: string;
  count?: string;
  active?: boolean;
}
export const list: IList[] = [
  {
    name: 'Albert',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '15:42',
    count: '4',
    avatar: 'src/assets/img/avatar2.jpg',
  },
  {
    name: 'Vasya',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '10:11',
  },
  {
    name: 'Semen',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '18:44',
    count: '111',
  },
  {
    name: 'Albert',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '15:42',
    count: '4',

  },
  {
    name: 'Vasya',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '10:11',
    active: true,
    avatar: 'src/assets/img/avatar1.jpg',
  },
  {
    name: 'Semen',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '18:44',
    count: '1',
  },
  {
    name: 'Albert',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '15:42',
    count: '4',

  },
  {
    name: 'Vasya',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '10:11',
  },
  {
    name: 'Semen',
    message: 'Какое-то длинное сообщение с активного чата, который кто-то написал',
    date: '18:44',
    count: '1',
  },
];

export const chatInfo: IList = list[4];
