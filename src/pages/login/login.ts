import Block from '../../@core/Block';
import LoginTemplate from './login.template';
import * as validate from '../../utils/validate';
import { ILoginPageProps } from '../../@models/pages';
import { Button, Field } from '../../components';

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
    const login = this.children.FieldLogin;
    const password = this.children.FieldPassword;
    const loginValue = (login instanceof Field) && login.getValue();
    const passwordValue = (password instanceof Field) && password.getValue();

    if (loginValue && passwordValue) {
      console.log({ login: loginValue, password: passwordValue });
      this.children.ButtonSubmit.setProps({ label: 'Заходим' });
    }
  }

  private onCreateAccount(event: Event): void {
    event.preventDefault();
  }

  render(): string {
    return LoginTemplate;
  }
}
