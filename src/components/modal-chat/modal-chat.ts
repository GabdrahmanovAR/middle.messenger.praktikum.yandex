import Block from '../../@core/Block';
import { Button } from '../button';
import { InputDropdown } from '../input-dropdown';
import ModalChatTemplate from './modal-chat.template';
import { IDropDownList, IModalChat } from '../../@models/components';
import { connect } from '../../utils/connect';
import { closeModal } from '../../services/modal.service';
import { DefaultAppState } from '../../@models/store';
import isEqual from '../../utils/isEqual';
import { findUser } from '../../services/user.service';
import { IUserInfo } from '../../api/model';
import { EMPTY_STRING } from '../../../assets/constants/common';
import * as validate from '../../utils/validate';

class ModalChat extends Block<IModalChat> {
  constructor(props: IModalChat) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            (this.children.DropdownInput as InputDropdown).clear();
            closeModal();
          }
        },
      },
    });
  }

  protected init(): void {
    const onClickBind = this.onClick.bind(this);
    const onInputBind = this.onInput.bind(this);

    const DropdownInput = new InputDropdown({
      label: this.props?.fieldLabel ?? 'Введите текст',
      type: 'text',
      name: this.props?.fieldName ?? 'modal-field',
      titleField: 'login',
      valueField: 'id',
      onInput: onInputBind,
      validate: validate.empty,
      onMenuItemSelect: (data) => console.log('CLICK'),
    });
    const ButtonComponent = new Button({
      type: 'submit',
      label: this.props?.buttonLabel ?? 'Ок',
      isRectangle: true,
      onClick: onClickBind,
    });

    this.children = {
      ...this.children,
      DropdownInput,
      ButtonComponent,
    };
  }

  private async onInput(value: string): Promise<void> {
    if (value) {
      const user = await findUser(value);
      console.log(user);
    } else {
      this.children.DropdownInput.setProps({ listItems: [] });
    }
  }

  private onClick(event: Event): void {
    event.preventDefault();
    const field = this.children.DropdownInput;
    const value = (field instanceof InputDropdown) && field.getValue();

    if (value && this.props.onClick) {
      this.props.onClick(value);
      field.clear();
      closeModal();
    }
  }

  private findedUsersToDropdownList(users: IUserInfo[]): IDropDownList[] {
    const list: IDropDownList[] = [];

    users.forEach((user: IUserInfo) => {
      list.push({
        icon: EMPTY_STRING,
        name: user.login,
        title: user.login,
        onClick: () => console.log('user click'),
      });
    });
    return list;
  }

  protected componentDidUpdate(_oldProps: IModalChat, _newProps: IModalChat): boolean {
    if (!isEqual(_oldProps, _newProps)) {
      this.children.DropdownInput.setProps({
        label: _newProps.fieldLabel,
        name: _newProps.fieldName,
      });
      this.children.ButtonComponent.setProps({ label: _newProps.buttonLabel });

      this.children.DropdownInput.setProps({ listItems: this.findedUsersToDropdownList(_newProps.findedUsers ?? []) });
    }
    return true;
  }

  protected render(): string {
    return ModalChatTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ findedUsers: state.findedUsers, ...state.modalState });

export default connect(mapStateToProps)(ModalChat);
