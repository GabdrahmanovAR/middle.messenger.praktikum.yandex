import Block from '../../@core/Block';
import { navigate } from '../../@core/Navigate';
import {
  Button, DataField, InputFile, ModalProfile,
} from '../../components';
import { IProfileField } from './profile.const';
import ProfilePageTemplate from './profile.template';
import * as validate from '../../utils/validate';

interface IProfilePageProps {
  name: string;
  dataFields: IProfileField[];
  dataFieldKeys: string[];
  passwordFields: IProfileField[];
  passwordFieldKeys: string[];
  edit?: boolean;
  editPassword?: boolean;
}

export default class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    const dataFields = props.dataFields.reduce((acc, data: IProfileField) => {
      const component = new DataField({
        type: data.type,
        label: data.label,
        value: data.value,
        name: data.name,
        last: data.last,
        validate: data.validate,
      });
      acc[data.name] = component;
      return acc;
    }, {});
    const passwordFields = props.passwordFields.reduce((acc, data: IProfileField) => {
      const component = new DataField({
        type: data.type,
        label: data.label,
        value: data.value,
        name: data.name,
        last: data.last,
        editable: data.editable,
        validate: data.validate,
      });
      acc[data.name] = component;
      return acc;
    }, {});

    super({
      ...props,
      name: 'Вася',
      dataFieldKeys: Object.keys(dataFields),
      passwordFieldKeys: Object.keys(passwordFields),
      ...dataFields,
      ...passwordFields,
    });
  }

  private editDataActive = false;

  private ediPasswordActive = false;

  protected init(): void {
    const onReturnBind = this.onReturn.bind(this);
    const onSaveBind = this.onSave.bind(this);
    const onEditDataBind = this.onEditData.bind(this);
    const onEditPasswordBind = this.onEditPassword.bind(this);
    const onExitBind = this.onExit.bind(this);
    const onAvatarChangeBind = this.onAvatarChange.bind(this);
    const repeatPasswordBind = this.repeatPassword.bind(this);

    const ButtonReturn = new Button({
      type: 'button',
      isRound: true,
      icon: '/assets/icons/arrow-left-white.svg',
      onClick: onReturnBind,
    });
    const ButtonSave = new Button({
      type: 'submit',
      label: 'Сохранить',
      isRectangle: true,
      onClick: onSaveBind,
    });
    const ButtonEditData = new Button({
      type: 'button',
      label: 'Изменить данные',
      isLink: true,
      onClick: onEditDataBind,
    });
    const ButtonEditPassword = new Button({
      type: 'button',
      label: 'Изменить пароль',
      isLink: true,
      onClick: onEditPasswordBind,
    });
    const ButtonExit = new Button({
      type: 'button',
      label: 'Выйти',
      isLink: true,
      theme: 'danger',
      onClick: onExitBind,
    });
    const AvatarInput = new InputFile({
      label: 'Поменять аватар',
      avatar: true,
      onClick: onAvatarChangeBind,
    });
    const ProfileModal = new ModalProfile({
      title: 'Загрузите файл',
    });

    (this.children.repeatPassword as Field).setProps({ validate: repeatPasswordBind });

    this.children = {
      ...this.children,
      ButtonReturn,
      ButtonSave,
      ButtonEditData,
      ButtonEditPassword,
      ButtonExit,
      AvatarInput,
      ProfileModal,
    };
  }

  private onAvatarChange(event: Event): void {
    event.preventDefault();
    (this.children.ProfileModal as ModalProfile).setProps({ visible: true });
  }

  private onReturn(): void {
    console.log('Return');
    if (this.editDataActive) {
      this.fieldsEditState(false);
      this.setProps({ edit: false });
      this.editDataActive = false;
    } else if (this.ediPasswordActive) {
      this.setProps({ editPassword: false, edit: false });
      this.ediPasswordActive = false;
    } else {
      console.log('Возврат к чатам');
    }

    const formKeys = Object.keys(this.children);

    formKeys.forEach((key: string) => {
      const fieldComponent = this.children[key];
      if (fieldComponent instanceof DataField && this.fieldsChecker(fieldComponent.props.name)) {
        fieldComponent.clearError();
      }
    });
  }

  private fieldsChecker(value: string): boolean {
    if (this.editDataActive) {
      return !value.toLowerCase().includes('password');
    }
    return value.toLowerCase().includes('password');
  }

  private onSave(event: Event): void {
    console.log('save');
    event.preventDefault();
    let allValid = true;

    const formValues: Record<string, unknown> = {};
    const formKeys = Object.keys(this.children);

    formKeys.forEach((key: string) => {
      const fieldComponent = this.children[key];
      if (fieldComponent instanceof DataField && this.fieldsChecker(fieldComponent.props.name)) {
        formValues[fieldComponent.props.name] = (fieldComponent)?.getValue();

        if (!formValues[key]) {
          allValid = false;
        }
      }
    });

    if (allValid) {
      console.log(formValues);
      formKeys.forEach((key: string) => {
        if (this.children[key] instanceof DataField) {
          const fieldComponent = this.children[key] as DataField;
          if (fieldComponent.props.onValueChange) {
            fieldComponent.props.onValueChange();
          }
        }
      });

      this.onReturn();
    } else {
      console.log('form not valid');
    }
  }

  private onEditData(): void {
    console.log('edit data');
    this.editDataActive = true;
    this.fieldsEditState(true);

    this.setProps({ edit: true });
  }

  private onEditPassword(): void {
    console.log('edit password');
    this.setProps({ editPassword: true, edit: true });
    this.ediPasswordActive = true;
  }

  private onExit(): void {
    console.log('exit');
    navigate('login');
  }

  private repeatPassword(repeatPasswordValue: string): string {
    const passwordValue = (this.children.newPassword as Field).getValue(false);

    return validate.repeatPassword(passwordValue, repeatPasswordValue);
  }

  private fieldsEditState(state: boolean): void {
    const formKeys = Object.keys(this.children);

    formKeys.forEach((key: string) => {
      const fieldComponent = this.children[key];
      if (this.children[key] instanceof DataField && this.fieldsChecker(fieldComponent.props.name)) {
        if (fieldComponent.props.onEditStateChange) {
          fieldComponent.props.onEditStateChange(state);
        }
      }
    });
  }

  protected render(): string {
    const dataFieldComponents = this.props.dataFieldKeys.map((key: string) => `{{{ ${key} }}}`).join('');
    const passwordFieldComponents = this.props.passwordFieldKeys.map((key: string) => `{{{ ${key} }}}`).join('');

    return ProfilePageTemplate
      .replace('#dataFields', dataFieldComponents)
      .replace('#passwordFields', passwordFieldComponents);
  }
}
