import * as Pages from '../pages';
import { fields } from '../pages/login/login.const';
import { dataFields, passwordFields } from '../pages/profile/profile.const';

type TRoute = 'login' | 'registration' | 'profile';

const pages = {
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage, { fields }],
  profile: [Pages.ProfilePage, { dataFields, passwordFields }],
};

export function navigate(route: TRoute): void {
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
