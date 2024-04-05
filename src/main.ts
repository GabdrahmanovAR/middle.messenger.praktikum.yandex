import './style.scss';
import './utils/hb-helpers';

import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { NavigatePage } from './assets/constants/common';

import { chatList, chatInfo } from './components/chat-list/chat-list';
import { changePassword, userData } from './pages/profile/profile';
import { dropDownlist, dropDownlist2 } from './components/dropdown-list/dropdown-list';
import { messages } from './components/message-list/message-list';

const pages: Record<string, unknown[]> = {
  [NavigatePage.LOGIN]: [Pages.LoginPage],
  [NavigatePage.REGISTER]: [Pages.RegistrationPage],
  [NavigatePage.NAV]: [Pages.NavigatePage],
  [NavigatePage.CHAT]: [Pages.ChatPage, { chatList, chatInfo, messages }],
  [NavigatePage.PROFILE]: [Pages.ProfilePage, { name: 'Иван', formData: userData }],
  [NavigatePage.PROFILE_PASS]: [Pages.ProfilePassPage, { formData: changePassword, edit: true }],
  [NavigatePage.ERROR]: [Pages.ErrorPage],
  [NavigatePage.NOT_FOUND]: [Pages.NotFoundPage],
  [NavigatePage.PROFILE_AVATAR_EDIT]: [Pages.ProfileAvatarEditPage],
  [NavigatePage.PROFILE_USER_EDIT]: [Pages.ProfileUserEditPage],
  [NavigatePage.DROPDOWN]: [Pages.DropDownPage, { dropdowns: [{ list: dropDownlist }, { list: dropDownlist2 }] }],
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
