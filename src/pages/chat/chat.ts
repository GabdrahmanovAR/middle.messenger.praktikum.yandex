import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IModalChat } from '../../@models/components';
import { IChatPageProps } from '../../@models/pages';
import { DefaultAppState } from '../../@models/store';
import { IChatInfo } from '../../api/model';
import Routes from '../../api/routes';
import {
  AddChat,
  Button, ChatCard, ChatContent, ChatList, InputText, AddUser,
  ModalConfirm,
  RemoveUser,
} from '../../components';
import { Modal } from '../../components/dropdown-list/dropdown-list.const';
import {
  createChat, getChats, setCardLastMessageUserName,
} from '../../services/chat.service';
import { openAddChatModal } from '../../services/modal.service';
import { connect } from '../../utils/connect';
import isEqual from '../../utils/isEqual';
import { getDate } from '../../utils/time';
import ChatTemplate from './chat.template';

class ChatPage extends Block<IChatPageProps> {
  private initialChats: IChatInfo[] = [];

  protected init(): void {
    getChats();
    const onProfileButtonClickBind = this.onProfileButtonClick.bind(this);
    const onChatPropertiesButtonClickBind = this.onChatPropertiesButtonClick.bind(this);
    const onSearchBind = this.onSearch.bind(this);

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
      icon: '/assets/icons/add-chat.svg',
      type: 'button',
      onClick: onChatPropertiesButtonClickBind,
    });
    const SearchField = new InputText({
      name: 'profile-button',
      center: true,
      placeholder: 'Поиск',
      icon: '/assets/icons/search.svg',
      onSearch: onSearchBind,
    });
    const ChatListComponent = new ChatList({
      chats: [],
      showList: false,
      chatList: [],
    });
    const ChatContentComponent = new ChatContent({});

    const AddUserModal = new AddUser({});
    const RemoveUserModal = new RemoveUser({});
    const ConfirmModal = new ModalConfirm({});
    const AddChatModal = new AddChat({});

    this.children = {
      ...this.children,
      AddChatButton,
      ProfileButton,
      SearchField,
      ChatListComponent,
      ChatContentComponent,
      AddUserModal,
      RemoveUserModal,
      ConfirmModal,
      AddChatModal,
    };
  }

  private onChatPropertiesButtonClick(): void {
    const modalChat: IModalChat = {
      title: 'Добавить чат',
      fieldLabel: 'Наименование чата',
      fieldName: Modal.ADD_CHAT,
      buttonLabel: 'Добавить',
      visible: true,
      onClick: this.onAddChat,
    };
    openAddChatModal(modalChat);
  }

  private onAddChat(title: string): void {
    createChat(title);
  }

  private onProfileButtonClick(): void {
    window.router.go(Routes.PROFILE);
  }

  private createChatCardsList(chats: IChatInfo[]): Block[] {
    return chats.map((chat: IChatInfo) => new ChatCard({
      id: chat.id,
      name: chat.title,
      avatar: chat.avatar ?? EMPTY_STRING,
      count: chat.unread_count,
      date: getDate(chat.last_message?.time ?? EMPTY_STRING),
      message: chat.last_message?.content ?? 'Нет сообщений',
      userName: setCardLastMessageUserName(chat),
      createdBy: chat.created_by,
    }));
  }

  // Поиск не доработан. При добавлении сообщения в чате, список восстанавливается до изначального.
  private onSearch(value: string): void {
    if (value) {
      const findedChats = this.initialChats.filter((chat: IChatInfo) => chat.title.startsWith(value));
      this.updateChatList(findedChats);
    } else {
      this.updateChatList(this.initialChats);
    }
  }

  private updateChatList(chats: IChatInfo[]): void {
    const chatList = this.createChatCardsList(chats) || [];
    const showList = chatList.length > 0;

    this.children.ChatListComponent.setProps({
      chatList,
      showList,
    });
  }

  protected componentDidUpdate(_oldProps: IChatPageProps, _newProps: IChatPageProps): boolean {
    const prevChats = _oldProps.chats;
    const nextChats = _newProps.chats;

    if (!isEqual(prevChats, nextChats)) {
      this.updateChatList(nextChats);
      this.initialChats = [...nextChats];
    }

    return true;
  }

  protected render(): string {
    return ChatTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ chats: state.chats });

export default connect(mapStateToProps)<IChatPageProps>(ChatPage);
