import Block from '../../@core/Block';
import { IProfilePageProps, IProfileField } from '../../@models/pages';
import { DefaultAppState } from '../../@models/store';
import { IUserInfo } from '../../api/model';
import Routes from '../../api/routes';
import {
  Button, DataField, InputFile, ModalProfile,
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
    const dataFieldComponents = dataFields.map((field: IProfileField) => new DataField({
      type: field.type,
      label: field.label,
      value: (props?.user[field.name as keyof IUserInfo] as string) ?? field.value,
      name: field.name,
      last: field.last,
      readonly: field.readonly,
      validate: field.validate,
    }));
    const passwordFieldComponents = passwordFields.map((field: IProfileField) => new DataField({
      type: field.type,
      label: field.label,
      value: field.value,
      name: field.name,
      last: field.last,
      validate: field.validate,
    }));

    super({
      ...props,
      name: '-',
      passwordFields: passwordFieldComponents,
      dataFields: dataFieldComponents,
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
      isFile: true,
      onClick: onAvatarChangeBind,
    });
    const ProfileModal = new ModalProfile({
      title: 'Загрузите файл',
    });

    this.setValidateForRepeatPassword(repeatPasswordBind);

    this.children = {
      ...this.children,
      ButtonReturn,
      AvatarInput,
      ButtonSave,
      ButtonEditData,
      ButtonEditPassword,
      ButtonExit,
      ProfileModal,
    };
  }

  private setValidateForRepeatPassword(validatefunc: (value: string) => string): void {
    this.props.passwordFields.forEach((passField) => {
      if (passField instanceof DataField && passField.props?.name === 'repeatPassword') {
        passField.setProps({ validate: validatefunc });
      }
    });
  }

  private onAvatarChange(event: Event): void {
    event.preventDefault();
    this.children.ProfileModal?.setProps({ visible: true });
  }

  private onReturn(): void {
    if (!this.editDataActive && !this.ediPasswordActive) {
      window.router.go(Routes.CHATS);
    }

    const allDataFields = [...this.props.dataFields, ...this.props.passwordFields];
    allDataFields.forEach((field: Block) => {
      if (field instanceof DataField) {
        field.clearError();
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

  private async onSave(event: Event): Promise<void> {
    event.preventDefault();
    let allValid = true;
    const fields: Block[] = [];

    if (this.ediPasswordActive) {
      fields.push(...this.props.passwordFields);
    } else {
      fields.push(...this.props.dataFields);
    }

    const formValues: Record<string, unknown> = {};
    fields.forEach((field: Block) => {
      if (field instanceof DataField) {
        const key = field.props.name;
        formValues[key] = field.getValue();

        if (!formValues[key]) {
          allValid = false;
        }
      }
    });

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
    let newPasswordValue = null;
    this.props.passwordFields.forEach((field) => {
      if (field instanceof DataField && field.props?.name === 'newPassword') {
        newPasswordValue = field.getValue(false);
      }
    });

    return validate.repeatPassword(newPasswordValue, repeatPasswordValue);
  }

  private fieldsEditState(state: boolean): void {
    this.props.dataFields.forEach((dataField) => {
      if (dataField instanceof DataField && dataField.props.onEditStateChange) {
        dataField.props.onEditStateChange(state);
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
    this.props.dataFields.forEach((field) => {
      if (field instanceof DataField) {
        const value = user[field.props.name as keyof IUserInfo];
        field.setProps({ value });
      }
    });
  }

  protected render(): string {
    return ProfilePageTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  user: state.user,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(ProfilePage);
