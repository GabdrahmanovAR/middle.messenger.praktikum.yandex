import Block from '../../../@core/Block';
import { Button } from '../../button';
import AddUserTemplate from './add-user.template';
import { IDropDownList, IModalAddUser } from '../../../@models/components';
import { connect } from '../../../utils/connect';
import { closeModal } from '../../../services/modal.service';
import { DefaultAppState } from '../../../@models/store';
import { findUser } from '../../../services/user.service';
import { IUserInfo } from '../../../api/model';
import { EMPTY_STRING } from '../../../../assets/constants/common';
import * as validate from '../../../utils/validate';
import { setGlobalError } from '../../../services/global-error.service';
import { DropDownList } from '../../dropdown-list';
import { Field } from '../../field';
import isEqual from '../../../utils/isEqual';

class AddUser extends Block<IModalAddUser> {
  private userId: number | null = null;

  constructor(props: IModalAddUser) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            (this.children.FieldInput as Field).clear();
            closeModal();
          }
        },
      },
    });
  }

  protected init(): void {
    const onClickBind = this.onClick.bind(this);
    const onInputBind = this.onInput.bind(this);

    const FieldInput = new Field({
      label: this.props?.fieldLabel ?? 'Введите текст',
      type: 'text',
      name: this.props?.fieldName ?? 'modal-field',
      titleField: 'login',
      valueField: 'id',
      onInput: onInputBind,
      validate: validate.empty,
    });
    const ButtonComponent = new Button({
      type: 'submit',
      label: this.props?.buttonLabel ?? 'Ок',
      isRectangle: true,
      onClick: onClickBind,
    });

    const DropDown = new DropDownList({
      appednTo: FieldInput.element,
      list: [],
    });

    this.children = {
      ...this.children,
      FieldInput,
      DropDown,
      ButtonComponent,
    };
  }

  private async onInput(value: string): Promise<void> {
    const dropDown = this.children.DropDown instanceof DropDownList ? this.children.DropDown : undefined;
    if (value) {
      const user = await findUser(value);
      const listOfFindedUsers = this.findedUsersToDropdownList(user ?? []);

      dropDown?.showList('app', 135);
      this.children.DropDown.setProps({ list: listOfFindedUsers });
    } else {
      dropDown?.hideList();
      dropDown?.setProps({ list: [] });
    }
  }

  private onClick(event: Event): void {
    event.preventDefault();

    if (this.userId && this.props.onClick) {
      this.props.onClick(this.userId);
      closeModal();
    } else {
      setGlobalError({}, 'Необходимо выбрать из существующих пользователей');
    }
  }

  private findedUsersToDropdownList(users: IUserInfo[]): IDropDownList[] {
    const list: IDropDownList[] = [];

    users.forEach((user: IUserInfo) => {
      list.push({
        icon: EMPTY_STRING,
        name: user.login,
        title: user.login,
        onClick: () => {
          this.userId = user.id;
          (this.children.FieldInput as Field).updateValue(user.login);
        },
      });
    });
    return list;
  }

  public componentDidUpdate(_oldProps: IModalAddUser, _newProps: IModalAddUser): boolean {
    const prevModalState = _oldProps.modalAddUser ?? {};
    const nextModalState = _newProps.modalAddUser ?? {};

    if (!isEqual(prevModalState, nextModalState)) {
      this.setProps({ ...nextModalState as IModalAddUser });
    }

    this.children.FieldInput.setProps({
      label: _newProps.fieldLabel,
      name: _newProps.fieldName,
    });
    this.children.ButtonComponent.setProps({ label: _newProps.buttonLabel });
    return true;
  }

  protected render(): string {
    return AddUserTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ modalAddUser: state.modalAddUser });

export default connect(mapStateToProps)(AddUser);
