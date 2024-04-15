import Block from '../../@core/Block';
import { IRegistrationPageProps } from '../../@models/pages';
import RegistrationPageTemplate from './registration.template';
import * as validate from '../../utils/validate';
import { Field } from '../../components';
import { navigate } from '../../@core/Navigate';

export default class RegistrationPage extends Block<IRegistrationPageProps> {
  constructor() {
    super({
      validate: {
        email: validate.email,
        login: validate.login,
        password: validate.password,
        name: validate.name,
        phone: validate.phone,
        repeatPassword: (value: string) => this.repeatPassword(value),
      },
      onSubmit: (event: Event) => {
        event.preventDefault();
        let allValid = true;

        const formValues: Record<string, unknown> = {};
        const formKeys = Object.keys(this.refs);

        formKeys.forEach((key: string) => {
          formValues[key] = (this.refs[key] as Field)?.getValue();

          if (!formValues[key]) {
            allValid = false;
          }
        });

        if (allValid) {
          console.log(formValues);
        } else {
          console.log('form not valid');
        }
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        navigate('login');
      },
    });
  }

  private repeatPassword(repeatPasswordValue: string): string {
    const passwordValue = (this.refs.password as Field).getValue(false);

    return validate.repeatPassword(passwordValue, repeatPasswordValue);
  }

  protected render(): string {
    return RegistrationPageTemplate;
  }
}
