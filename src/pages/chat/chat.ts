import Block from '../../@core/Block';
import { IModalUser } from '../../@models/components';
import { IChatPageProps } from '../../@models/pages';
import {
  Button, ChatContent, ChatList, InputText, ModalUser,
} from '../../components';
import { chatInfo, chatList } from './chat-list.const';
import ChatTemplate from './chat.template';

export default class ChatPage extends Block<IChatPageProps> {
  protected init(): void {
    const onProfileButtonClickBind = this.onProfileButtonClick.bind(this);
    const onPropertiesItemClickBind = this.onPropertiesItemClick.bind(this);

    const ProfileButton = new Button({
      label: 'Профиль',
      type: 'button',
      isLink: true,
      theme: 'second',
      icon: '/assets/icons/chevron.svg',
      onClick: onProfileButtonClickBind,
    });
    const InputTextField = new InputText({
      name: 'profile-button',
      center: true,
      placeholder: 'Поиск',
      icon: '/assets/icons/search.svg',
    });
    const ChatListComponent = new ChatList({
      chatList,
    });
    const ChatContentComponent = new ChatContent({
      chatInfo,
      onModalOpen: (itemName: string): void => {
        onPropertiesItemClickBind(itemName);
      },
    });
    const UserModal = new ModalUser({
      title: 'Управление пользователем',
    });

    this.children = {
      ...this.children,
      ProfileButton,
      InputTextField,
      ChatListComponent,
      ChatContentComponent,
      UserModal,
    };
  }

  private onProfileButtonClick(): void {
  }

  private onPropertiesItemClick(itemName: string): void {
    if (!itemName) {
      return;
    }

    const modalUser = this.children.UserModal;
    const props: IModalUser = {
      fieldLabel: 'Логин',
      visible: true,
    };

    if (itemName === 'add') {
      props.title = 'Добавить пользователя';
      props.buttonLabel = 'Добавить';
    }

    if (itemName === 'remove') {
      props.title = 'Удалить пользователя';
      props.buttonLabel = 'Удалить';
    }

    if (modalUser instanceof ModalUser) {
      modalUser.setProps({ ...props });
      modalUser.updateChildrenState();
    } else {
      throw new Error('Ошибка обновления модального окна');
    }
  }

  protected render(): string {
    return ChatTemplate;
  }
}
