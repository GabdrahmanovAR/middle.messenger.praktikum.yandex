import Block from '../../../@core/Block';
import { IModalConfirm, IModalRemoveUser } from '../../../@models/components';
import { connect } from '../../../utils/connect';
import { closeConfirmModal, closeRemoveUserModal, openConfirmModal } from '../../../services/modal.service';
import { DefaultAppState } from '../../../@models/store';
import { IChatUser } from '../../../api/model';
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

  public componentAfterUpdate(): void {
    const userListContainer = document.getElementById('remove-user');
    if (!userListContainer) {
      return;
    }

    userListContainer.removeEventListener('click', this.onUserClick);
    userListContainer.addEventListener('click', this.onUserClick.bind(this));
  }

  protected render(): string {
    return `
    <div class="container center modal-container{{#if visible}} modal-container_visible{{/if}}">
      <div class="remove-user-window">
        <div class="remove-user-window__header">
          <span class="remove-user-window__title">
            Удаление пользователя
          </span>
        </div>
        <div action="" class="remove-user-window__form">
          <div id="remove-user" class="remove-user-window__content">
          ${(this.props.selectedChatUsers && this.props.selectedChatUsers.length > 0)
    ? this.props.selectedChatUsers?.map((user: IChatUser) => `
              <div name="${user.id}" class="remove-user-window__user-item">
                <span class="remove-user-window__user-name">Имя: ${user.first_name}</span>
                <span>Роль: ${user.role}</span>
              </div>
              `).join('')
    : 'Пользователи не добавлены'}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  ...state.modalRemoveUser,
  selectedChatUsers: state.selectedChatUsers,
  selectedChat: state.selectedChat,
});

export default connect(mapStateToProps)(RemoveUser);
