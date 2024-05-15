import Block from '../../../@core/Block';
import RemoveUserTemplate from './remove-user.template';
import { IModalConfirm, IModalRemoveUser } from '../../../@models/components';
import { connect } from '../../../utils/connect';
import { closeConfirmModal, closeRemoveUserModal, openConfirmModal } from '../../../services/modal.service';
import { DefaultAppState } from '../../../@models/store';
import { IAddChatUser, IChatUser } from '../../../api/model';
import { removeChatUser } from '../../../services/chat.service';

class RemoveUser extends Block<IModalRemoveUser> {
  constructor(props: IModalRemoveUser) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            closeRemoveUserModal();
          }
        },
      },
    });
  }

  private onUserClick(event: MouseEvent): void {
    const { target } = event;
    if (!target || !(target instanceof HTMLElement)) {
      return;
    }
    const userId = Number(target.getAttribute('name'));
    if (userId) {
      console.log(userId);
      const modalState: IModalConfirm = {
        title: 'Подтверждение удаления пользователя',
        text: 'Вы уверены что хотите удалить пользователя из чата?',
        visible: true,
        onConfirm: async () => {
          const { chatId } = this.props;
          await removeChatUser(chatId, userId);
          closeConfirmModal();
        },
      };
      openConfirmModal(modalState);
    }
  }

  protected componentAfterUpdate(): void {
    const userListContainer = document.getElementById('remove-user');
    if (!userListContainer) {
      return;
    }

    userListContainer.removeEventListener('click', this.onUserClick);
    userListContainer.addEventListener('click', this.onUserClick.bind(this));
  }

  protected render(): string {
    const userList = (this.props.chatUsers && this.props.chatUsers.length > 0)
      ? this.props.chatUsers?.map((user: IChatUser) => `
        <div name="${user.id}" class="remove-user-window__user-item">
          <span class="remove-user-window__user-name">Имя: ${user.first_name}</span>
          <span>Роль: ${user.role}</span>
        </div>
        `).join('')
      : 'Пользователи не добавлены';
    return RemoveUserTemplate.replace('#userList', userList);
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  ...state.modalRemoveUser,
  selectedChat: state.selectedChat,
});

export default connect(mapStateToProps)(RemoveUser);
