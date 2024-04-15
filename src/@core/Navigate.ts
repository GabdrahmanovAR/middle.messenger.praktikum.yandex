import * as Pages from '../pages';

type TRoute = 'login' | 'registration';

const pages = {
  login: Pages.LoginPage,
  registration: Pages.RegistrationPage,
};

export function navigate(route: TRoute): void {
  const container = document.getElementById('app');

  if (container) {
    container.innerHTML = '';

    const Component = pages[route];
    const component = new Component();
    const content = component.getContent();

    if (content) {
      container.append(content);
    } else {
      throw new Error(`Ошибка получения содержимого страницы - ${route}`);
    }
  }
}
