import Block from '../../@core/Block';
import router from '../../@core/Router';
import { IProfilePageProps, IProfileField } from '../../@models/pages';
import Routes from '../../api/routes';
import {
  Button, DataField, Field, InputFile, ModalProfile,
} from '../../components';
import * as validate from '../../utils/validate';
import ProfilePageTemplate from './profile.template';

export default class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    const dataFields = props.dataFields.reduce((acc: Record<string, DataField>, data: IProfileField) => {
      const component = new DataField({
        type: data.type,
        label: data.label,
        value: data.value,
        name: data.name,
        last: data.last,
        readonly: data.readonly,
        validate: data.validate,
      });
      acc[data.name] = component;
      return acc;
    }, {});
    const passwordFields = props.passwordFields.reduce((acc: Record<string, DataField>, data: IProfileField) => {
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

    this.children.repeatPassword?.setProps({ validate: repeatPasswordBind });

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
    this.children.ProfileModal?.setProps({ visible: true });
  }

  private onReturn(): void {
    if (!this.editDataActive && !this.ediPasswordActive) {
      router.go(Routes.CHATS);
    }

    const formKeys = Object.keys(this.children);

    formKeys.forEach((key: string) => {
      const fieldComponent = this.children[key];
      if (fieldComponent instanceof DataField && this.fieldsChecker(fieldComponent.props.name)) {
        fieldComponent.clearError();
      }
    });

    if (this.editDataActive) {
      this.fieldsEditState(true);
      this.setProps({ edit: false });
      this.editDataActive = false;
      return;
    }

    if (this.ediPasswordActive) {
      this.setProps({ editPassword: false, edit: false });
      this.ediPasswordActive = false;
    }
  }

  private fieldsChecker(value: string): boolean {
    if (this.editDataActive) {
      return !value.toLowerCase().includes('password');
    }
    return value.toLowerCase().includes('password');
  }

  private onSave(event: Event): void {
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
        const fieldComponent = this.children[key];

        if (fieldComponent instanceof DataField && fieldComponent.props.onValueChange) {
          fieldComponent.props.onValueChange();
        }
      });

      this.onReturn();
    } else {
      console.log('form not valid');
    }
  }

  private onEditData(): void {
    this.editDataActive = true;
    this.fieldsEditState(false);
    this.setProps({ edit: true });
  }

  private onEditPassword(): void {
    this.setProps({ editPassword: true, edit: true });
    this.ediPasswordActive = true;
  }

  private onExit(): void {
    router.go(Routes.LOGIN);
  }

  private repeatPassword(repeatPasswordValue: string): string {
    const passwordValue = (this.children.newPassword as Field).getValue(false);

    return validate.repeatPassword(passwordValue, repeatPasswordValue);
  }

  private fieldsEditState(state: boolean): void {
    const formKeys = Object.keys(this.children);

    formKeys.forEach((key: string) => {
      const fieldComponent = this.children[key];

      if (fieldComponent instanceof DataField
        && this.fieldsChecker(fieldComponent.props.name)
        && fieldComponent.props.onEditStateChange
      ) {
        fieldComponent.props.onEditStateChange(state);
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
