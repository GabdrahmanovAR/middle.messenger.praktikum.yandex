import { IMessages } from '../../@models/components';

const fakeMessage = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique molestias, quae magni
maxime
veritatis architecto, odit quo a minima fugit tenetur perspiciatis illo labore dolorum explicabo distinctio
deleniti
ullam. Blanditiis.`;
const exampleMessage = `Не бери в голову. Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в
какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что
астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны,
так как астронавты с собой забрали только кассеты с пленкой.
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`;

export const messages: IMessages[] = [
  {
    id: 'message-block-1',
    date: '02 февраля',
    messageGroup: [
      {
        group: [
          { message: fakeMessage, date: '22:02' },
          { message: fakeMessage, date: '22:03' },
        ],
      },
      {
        group: [
          {
            message: fakeMessage, own: true, read: true, date: '22:05',
          },
          {
            message: fakeMessage, own: true, read: true, date: '22:06',
          },
          {
            message: fakeMessage, own: true, read: true, date: '22:08',
          },
        ],
      },
      {
        group: [
          { message: exampleMessage, date: '22:12' },
          { image: '/assets/img/camera.png', date: '22:13' },
        ],
      },
    ],
  },
  {
    id: 'message-block-2',
    date: '03 февраля',
    messageGroup: [
      {
        group: [
          {
            message: fakeMessage, own: true, read: true, date: '11:44',
          },
          {
            message: fakeMessage, own: true, read: true, date: '11:50',
          },
          {
            message: fakeMessage, own: true, read: true, date: '11:51',
          },
          {
            message: fakeMessage, own: true, read: true, date: '11:54',
          },
          {
            message: fakeMessage, own: true, read: true, date: '11:59',
          },
          {
            message: fakeMessage, own: true, read: true, date: '12:24',
          },
          {
            message: fakeMessage, own: true, delivered: true, date: '12:44',
          },
          {
            message: fakeMessage, own: true, send: true, date: '12:50',
          },
        ],
      },
    ],
  },
];
