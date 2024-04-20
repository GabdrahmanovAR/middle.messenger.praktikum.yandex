import Block from '../../@core/Block';
import { navigate } from '../../@core/Navigate';
import { Button, ChatContent, ChatList, InputText, ModalUser } from '../../components';
import { chatInfo, chatList } from './chat-list.const';
import ChatTemplate from './chat.template';

interface IChatPageProps {
}

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
    const UserModal = new ModalUser({});

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
    navigate('profile');
  }

  private onPropertiesItemClick(itemName: string): void {
    if (!itemName) {
      return;
    }

    if (itemName === 'add') {
      (this.children.UserModal as ModalUser).setProps({
        title: 'Добавить пользователя',
        fieldLabel: 'Логин',
        buttonLabel: 'Добавить',
        visible: true,
      });
    }

    if (itemName === 'remove') {
      (this.children.UserModal as ModalUser).setProps({
        title: 'Удалить пользователя',
        fieldLabel: 'Логин',
        buttonLabel: 'Удалить',
        visible: true,
      });
    }
    (this.children.UserModal as ModalUser).updateChildrenState();
  }

  protected render(): string {
    return ChatTemplate;
  }
}
