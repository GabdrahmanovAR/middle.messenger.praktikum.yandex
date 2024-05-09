import Block from '../../@core/Block';
import { DefaultAppState } from '../../@models/common';
import { IProfilePageProps, IProfileField } from '../../@models/pages';
import { IUserInfo } from '../../api/model';
import Routes from '../../api/routes';
import {
  Button, DataField, Field, InputFile, ModalProfile,
} from '../../components';
import { logout } from '../../services/auth.service';
import { updateUserInfo, updateUserPassword } from '../../services/user.service';
import { connect } from '../../utils/connect';
import isEqual from '../../utils/isEqual';
import { isUpdatePassword, isUpdateUser } from '../../utils/type-check';
import * as validate from '../../utils/validate';
import { dataFields, passwordFields } from './profile.const';
import ProfilePageTemplate from './profile.template';

class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    const dataFieldComponents = dataFields.reduce((acc: Record<string, DataField>, data: IProfileField) => {
      const component = new DataField({
        type: data.type,
        label: data.label,
        value: (props?.user[data.name as keyof IUserInfo] as string) ?? data.value,
        name: data.name,
        last: data.last,
        readonly: data.readonly,
        validate: data.validate,
      });
      acc[data.name] = component;
      return acc;
    }, {});
    const passwordFieldComponents = passwordFields.reduce((acc: Record<string, DataField>, data: IProfileField) => {
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
      name: '-',
      dataFieldKeys: Object.keys(dataFieldComponents),
      passwordFieldKeys: Object.keys(passwordFieldComponents),
      ...dataFieldComponents,
      ...passwordFieldComponents,
    });
  }

  private editDataActive = false;

  private ediPasswordActive = false;

  protected componentDidMount(_oldProps?: IProfilePageProps | undefined): void {
    // checkUserData();
  }

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
      isFile: true,
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
      window.router.go(Routes.CHATS);
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

  private async onSave(event: Event): Promise<void> {
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

    console.log(formValues);
    if (!allValid) {
      return;
    }
    if (isUpdateUser(formValues)) {
      await updateUserInfo(formValues);
      this.onReturn();
      return;
    }
    if (isUpdatePassword(formValues)) {
      const { oldPassword, newPassword } = formValues;
      await updateUserPassword({ oldPassword, newPassword });
      this.onReturn();
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
    logout();
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

  protected componentDidUpdate(_oldProps: IProfilePageProps, _newProps: IProfilePageProps): boolean {
    if (!isEqual(_oldProps.user, _newProps.user)) {
      const { user } = _newProps;
      this._updateDataFields(user);
    }

    if (_oldProps.isLoading !== _newProps.isLoading) {
      this.children.ButtonSave.setProps({ isLoading: _newProps.isLoading });
    }
    return true;
  }

  private _updateDataFields(user: IUserInfo): void {
    this.props.dataFieldKeys.forEach((fieldKey: string) => {
      const dataField = this.children[fieldKey];
      if (dataField instanceof DataField) {
        const value = user[fieldKey as keyof IUserInfo];
        dataField.setProps({ value });
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

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  user: state.user,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(ProfilePage);
