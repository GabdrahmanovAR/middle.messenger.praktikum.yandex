import Block from '../../@core/Block';
import LoginTemplate from './login.template';
import * as validate from '../../utils/validate';
import { ILoginPageProps } from '../../@models/pages';
import { Button, Field } from '../../components';
import { navigate } from '../../@core/Navigate';

export default class LoginPage extends Block<ILoginPageProps> {
  protected init(): void {
    const onLoginBind = this.onLogin.bind(this);
    const onCreateAccountBind = this.onCreateAccount.bind(this);

    const FieldLogin = new Field({
      label: 'Логин',
      type: 'input',
      required: true,
      name: 'login',
      validate: validate.login,
    });
    const FieldPassword = new Field({
      label: 'Пароль',
      type: 'password',
      required: true,
      name: 'password',
      validate: validate.password,
    });
    const ButtonSubmit = new Button({
      label: 'Войти',
      type: 'submit',
      isRectangle: true,
      onClick: onLoginBind,
    });
    const ButtonLink = new Button({
      label: 'Нет аккаунта?',
      type: 'button',
      isLink: true,
      onClick: onCreateAccountBind,
    });

    this.children = {
      ...this.children,
      FieldLogin,
      FieldPassword,
      ButtonSubmit,
      ButtonLink,
    };
  }

  private onLogin(event: Event): void {
    event.preventDefault();
    const login = (this.children.FieldLogin as Field).getValue();
    const password = (this.children.FieldPassword as Field).getValue();

    if (login && password) {
      console.log({ login, password });
      (this.children.ButtonSubmit as Button).setProps({ label: 'Заходим' });

      let interval = 2;
      const navigateDelay = setInterval(() => {
        console.log(`Переход на страницу чатов через - ${interval}.`);
        interval -= 1;

        if (interval === 0) {
          clearInterval(navigateDelay);
        }
      }, 1000);
    }
  }

  private onCreateAccount(event: Event): void {
    event.preventDefault();
    navigate('registration');
  }

  render(): string {
    return LoginTemplate;
  }
}
