import Block from '../../@core/Block';
import { navigate } from '../../@core/Navigate';
import { Button, ChatContent, ChatList, InputText } from '../../components';
import { chatInfo, chatList } from './chat-list.const';
import ChatTemplate from './chat.template';

interface IChatPageProps {
}

export default class ChatPage extends Block<IChatPageProps> {
  protected init(): void {
    const onProfileButtonClickBind = this.onProfileButtonClick.bind(this);

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
    });

    this.children = {
      ...this.children,
      ProfileButton,
      InputTextField,
      ChatListComponent,
      ChatContentComponent,
    };
  }

  private onProfileButtonClick(): void {
    navigate('profile');
  }

  protected render(): string {
    return ChatTemplate;
  }
}
