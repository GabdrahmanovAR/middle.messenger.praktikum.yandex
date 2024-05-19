import * as validate from '../../utils/validate';
import Block from '../../@core/Block';
import { IField, IRegistrationPageProps } from '../../@models/pages';
import RegistrationPageTemplate from './registration.template';
import { Button, Field } from '../../components';
import Routes from '../../api/routes';
import { createUser } from '../../services/auth.service';
import { isCreateUser } from '../../utils/type-check';
import { fields } from './registration.const';

export default class RegistrationPage extends Block<IRegistrationPageProps> {
  constructor(props: IRegistrationPageProps) {
    const inputFields = fields.map((data: IField) => new Field({
      label: data.label,
      name: data.name,
      type: data.type,
      required: data.required,
      validate: data.validate,
    }));

    super({
      ...props,
      inputFields,
    });
  }

  protected init(): void {
    const onSubmitBind = this.onSubmit.bind(this);
    const onLoginBind = this.onLogin.bind(this);
    const repeatPasswordBind = this.repeatPassword.bind(this);

    const ButtonSubmit = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      isRectangle: true,
      onClick: onSubmitBind,
    });
    const ButtonLink = new Button({
      label: 'Войти',
      type: 'button',
      isLink: true,
      onClick: onLoginBind,
    });

    this.setValidateForRepeatPassword(repeatPasswordBind);

    this.children = {
      ...this.children,
      ButtonSubmit,
      ButtonLink,
    };
  }

  private setValidateForRepeatPassword(validatefunc: (value: string) => string): void {
    this.props.inputFields.forEach((passField) => {
      if (passField instanceof Field && passField.props?.name === 'repeatPassword') {
        passField.setProps({ validate: validatefunc });
      }
    });
  }

  private onSubmit(event: Event): void {
    event.preventDefault();
    let allValid = true;

    const formValues: Record<string, unknown> = {};
    this.props.inputFields.forEach((field: Block) => {
      if (field instanceof Field) {
        const key = field.props.name;
        formValues[key] = field.getValue();

        if (!formValues[key]) {
          allValid = false;
        }
      }
    });

    const { repeatPassword, ...rest } = formValues;
    if (allValid && isCreateUser(rest)) {
      createUser(rest);
    }
  }

  private onLogin(event: Event): void {
    event.preventDefault();
    window.router.go(Routes.LOGIN);
  }

  private repeatPassword(repeatPasswordValue: string): string {
    let newPasswordValue = null;
    this.props.inputFields.forEach((field) => {
      if (field instanceof Field && field.props?.name === 'password') {
        newPasswordValue = field.getValue(false);
      }
    });

    return validate.repeatPassword(newPasswordValue, repeatPasswordValue);
  }

  protected render(): string {
    return RegistrationPageTemplate;
  }
}
