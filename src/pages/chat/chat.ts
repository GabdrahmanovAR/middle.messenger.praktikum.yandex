import Block from '../../@core/Block';
import { IChatPageProps } from '../../@models/pages';
import Routes from '../../api/routes';
import {
  Button, ChatContent, ChatList, DropDownList, InputText, ModalChat,
} from '../../components';
import { chatDropdownList } from '../../components/dropdown-list/dropdown-list.const';
import { chatInfo, chatList } from './chat-list.const';
import ChatTemplate from './chat.template';

export default class ChatPage extends Block<IChatPageProps> {
  protected init(): void {
    const onProfileButtonClickBind = this.onProfileButtonClick.bind(this);
    const onChatPropertiesButtonClickBind = this.onChatPropertiesButtonClick.bind(this);

    const ProfileButton = new Button({
      label: 'Профиль',
      type: 'button',
      isLink: true,
      theme: 'second',
      icon: '/assets/icons/chevron.svg',
      onClick: onProfileButtonClickBind,
    });
    const ChatPropertiesButton = new Button({
      isRound: true,
      theme: 'text',
      icon: '/assets/icons/properties.svg',
      type: 'button',
      onClick: onChatPropertiesButtonClickBind,
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
    const ChatContentComponent = new ChatContent({ chatInfo });
    const ChatDropdown = new DropDownList({
      list: chatDropdownList,
      appednTo: ChatPropertiesButton.element,
    });
    const ChatModal = new ModalChat({});

    this.children = {
      ...this.children,
      ProfileButton,
      ChatPropertiesButton,
      InputTextField,
      ChatListComponent,
      ChatContentComponent,
      ChatDropdown,
      ChatModal,
    };
  }

  private onChatPropertiesButtonClick(): void {
    const dropdown = this.children.ChatPropertiesButton;
    if (dropdown instanceof DropDownList) {
      dropdown.show();
    }
  }

  private onProfileButtonClick(): void {
    window.router.go(Routes.PROFILE);
  }

  protected render(): string {
    return ChatTemplate;
  }
}
