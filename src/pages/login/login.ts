import Block from '../../@core/Block';
import LoginTemplate from './login.template';
import * as validate from '../../utils/validate';
import { ILoginPageProps } from '../../@models/pages';
import { Button, Field } from '../../components';
import Routes from '../../api/routes';
import { login } from '../../services/auth.service';
import { connect } from '../../utils/connect';
import { DefaultAppState } from '../../@models/store';

class LoginPage extends Block<ILoginPageProps> {
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
    const loginComponent = this.children.FieldLogin;
    const passwordComponent = this.children.FieldPassword;
    const loginValue = (loginComponent instanceof Field) && loginComponent.getValue();
    const passwordValue = (passwordComponent instanceof Field) && passwordComponent.getValue();

    if (loginValue && passwordValue) {
      login({ login: loginValue, password: passwordValue });
    }
  }

  private onCreateAccount(event: Event): void {
    event.preventDefault();
    window.router.go(Routes.SIGN_UP);
  }

  protected componentDidUpdate(_oldProps: ILoginPageProps, _newProps: ILoginPageProps): boolean {
    if (_oldProps.isLoading !== _newProps.isLoading) {
      this.children.ButtonSubmit.setProps({ isLoading: _newProps.isLoading });
    }
    return true;
  }

  render(): string {
    return LoginTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ isLoading: state.isLoading });

export default connect(mapStateToProps)(LoginPage);
