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
    const registrationFields = fields.reduce((acc: Record<string, Field>, data: IField) => {
      const component = new Field({
        label: data.label,
        name: data.name,
        type: data.type,
        required: data.required,
        validate: data.validate,
      });
      acc[data.name] = component;
      return acc;
    }, {});

    super({
      ...props,
      fieldKeys: Object.keys(registrationFields),
      ...registrationFields,
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

    this.children.repeat_password?.setProps({ validate: repeatPasswordBind });

    this.children = {
      ...this.children,
      ButtonSubmit,
      ButtonLink,
    };
  }

  private onSubmit(event: Event): void {
    event.preventDefault();
    let allValid = true;

    const formValues: Record<string, unknown> = {};
    const formKeys = Object.keys(this.children);

    formKeys.forEach((key: string) => {
      if (this.children[key] instanceof Field) {
        const fieldComponent = this.children[key] as Field;
        formValues[fieldComponent.props.name] = (fieldComponent)?.getValue();

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
    const passwordValue = (this.children.password as Field).getValue(false);

    return validate.repeatPassword(passwordValue, repeatPasswordValue);
  }

  protected render(): string {
    const fieldsComponents = this.props.fieldKeys.map((key: string) => `{{{ ${key} }}}`).join('');
    return RegistrationPageTemplate.replace('#fields', fieldsComponents);
  }
}
