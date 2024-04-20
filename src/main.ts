import './style.scss';
import Handlebars from 'handlebars';
import * as Pages from './pages';
import { fields } from './pages/registration/registration.const';
import { dataFields, passwordFields } from './pages/profile/profile.const';
import { IProps } from './@models/common';
import Block from './@core/Block';

type TPage = new (...args: any[]) => Block<IProps>;

type TContext = {
  [key: string]: unknown;
};

type TPages = {
  [key: string]: [TPage, TContext | undefined];
};

const pages: TPages = {
  login: [Pages.LoginPage, {}],
  registration: [Pages.RegistrationPage, { fields }],
  profile: [Pages.ProfilePage, { dataFields, passwordFields }],
  chat: [Pages.ChatPage, {}],
};

export function navigate(route: string): void {
  const [Source, context] = pages[route];
  const container = document.getElementById('app');

  if (container) {
    container.innerHTML = '';

    const component = new Source(context);
    const content = component.getContent();

    if (content) {
      container.append(content);
    } else {
      throw new Error(`Ошибка получения содержимого страницы - ${route}`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');

  if (container) {
    const templateDelegate: HandlebarsTemplateDelegate = Handlebars.compile(Pages.NavigatePage);
    container.innerHTML = templateDelegate({});
  }
});

document.addEventListener('click', (e: MouseEvent) => {
  const page = (e.target as HTMLElement)?.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
