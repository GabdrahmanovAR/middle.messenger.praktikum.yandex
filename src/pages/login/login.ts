import Block from '../../@core/Block';
import LoginTemplate from './login.template';
import * as validate from '../../utils/validate';
import { ILoginPageProps } from '../../@models/pages';
import { Button, Field } from '../../components';
import { navigate } from '../../@core/Navigate';

export default class LoginPage extends Block<ILoginPageProps> {
  constructor() {
    super({
      validate: {
        login: validate.login,
        password: validate.password,
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = (this.refs.login as Field).getValue();
        const password = (this.refs.password as Field).getValue();

        if (login && password) {
          console.log({ login, password });
          (this.refs.submit as Button).setProps({ label: 'Заходим' });

          let interval = 2;
          const navigateDelay = setInterval(() => {
            console.log(`Переход на страницу чатов через - ${interval}.`);
            interval -= 1;

            if (interval === 0) {
              clearInterval(navigateDelay);
            }
          }, 1000);
        }
      },
      onCreateAccount: (event: Event) => {
        event.preventDefault();
        navigate('registration');
      },
    });
  }

  render(): string {
    return LoginTemplate;
  }
}
