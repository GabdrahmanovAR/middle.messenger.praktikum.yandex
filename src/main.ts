import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { NavigatePage } from './assets/constants/common';

const pages: Record<string, unknown[]> = {
  [NavigatePage.LOGIN]: [Pages.LoginPage],
  [NavigatePage.REGISTER]: [Pages.RegistrationPage],
  [NavigatePage.NAV]: [Pages.NavigatePage],
  [NavigatePage.ERROR]: [Pages.ErrorPage],
  [NavigatePage.NOT_FOUND]: [Pages.NotFoundPage],
};

Object.entries(Components).forEach(([name, component]: [string, string]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;
  const templateDelegate: HandlebarsTemplateDelegate = Handlebars.compile(source);
  container.innerHTML = templateDelegate(context);
}

document.addEventListener('DOMContentLoaded', () => navigate(NavigatePage.NAV));

document.addEventListener('click', (e: MouseEvent) => {
  const page = (e.target as HTMLElement)?.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
