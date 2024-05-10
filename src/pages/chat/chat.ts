import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IModalChat } from '../../@models/components';
import { IChatPageProps } from '../../@models/pages';
import { DefaultAppState } from '../../@models/store';
import { IChatInfo } from '../../api/model';
import Routes from '../../api/routes';
import {
  Button, ChatCard, ChatContent, ChatList, InputText, ModalChat,
} from '../../components';
import { Modal } from '../../components/dropdown-list/dropdown-list.const';
import { createChat, getChats } from '../../services/chat.service';
import { openModal } from '../../services/modal.service';
import { connect } from '../../utils/connect';
import { chatInfo } from './chat-list.const';
import ChatTemplate from './chat.template';

class ChatPage extends Block<IChatPageProps> {
  protected init(): void {
    getChats();
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
    const AddChatButton = new Button({
      isRound: true,
      theme: 'text',
      icon: '/assets/icons/add.svg',
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
      chats: [],
      showList: false,
    });
    const ChatContentComponent = new ChatContent({ chatInfo });
    const ChatModal = new ModalChat({});

    this.children = {
      ...this.children,
      AddChatButton,
      ProfileButton,
      InputTextField,
      ChatListComponent,
      ChatContentComponent,
      ChatModal,
    };
  }

  private onChatPropertiesButtonClick(): void {
    const modalState: IModalChat = {
      title: 'Добавить чат',
      fieldLabel: 'Наименование чата',
      fieldName: Modal.ADD_CHAT,
      buttonLabel: 'Добавить',
      name: Modal.ADD_CHAT,
      visible: true,
      onClick: this.onAddChat,
    };
    openModal(modalState);
  }

  private onAddChat(title: string): void {
    createChat(title);
  }

  private onProfileButtonClick(): void {
    window.router.go(Routes.PROFILE);
  }

  private createChatCardsList(chats: IChatInfo[]): Block[] {
    return chats.map((chat) => new ChatCard({
      id: chat.id,
      name: chat.title,
      avatar: chat.avatar ?? EMPTY_STRING,
      count: chat.unread_count,
      date: chat.last_message?.time,
      message: chat.last_message?.content ?? 'Нет сообщений',
    }));
  }

  protected componentDidUpdate(_oldProps: IChatPageProps, _newProps: IChatPageProps): boolean {
    const { chats } = _newProps;
    if (chats && chats.length > 0) {
      const chatList = this.createChatCardsList(chats) || [];
      const showList = chatList.length > 0;
      this.children.ChatListComponent.setProps({
        chatList,
        showList,
      });
    }
    return true;
  }

  protected render(): string {
    return ChatTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ chats: state.chats });

export default connect(mapStateToProps)(ChatPage);
