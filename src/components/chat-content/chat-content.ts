import Block from '../../@core/Block';
import { Button } from '../button';
import { InputText } from '../input-text';
import { MessageList } from '../message-list';
import ChatContentTemplate from './chat-content.template';
import { DropDownList } from '../dropdown-list';
import { Modal, pinDropdownList, chatPropertiesDropDown } from '../dropdown-list/dropdown-list.const';
import {
  IChatContentProps, IDropDownItems, IDropDownList, IModalConfirm, IModalRemoveUser, IModalAddUser,
} from '../../@models/components';
import { connect } from '../../utils/connect';
import { DefaultAppState } from '../../@models/store';
import { createWebSocket } from '../../services/websocket.service';
import { WSTransportEvent } from '../../@core/WsTransport';
import isEqual from '../../utils/isEqual';
import { IMessageType } from '../../@models/websocket';
import {
  closeConfirmModal, openConfirmModal, openAddUserModal, openRemoveUserModal,
} from '../../services/modal.service';
import {
  addChatUser, deleteChat, getSelectedChatId, leaveChat, removeChatFromList,
  showMessage,
  updateChatAvatar,
} from '../../services/chat.service';
import { IAddChatUser } from '../../api/model';
import { setGlobalError } from '../../services/global-error.service';
import { getCurrentUserId } from '../../services/user.service';
import { AddFile } from '../modals';

class ChatContent extends Block<IChatContentProps> {
  constructor(props: IChatContentProps) {
    super({
      ...props,
      showChat: !!props.selectedChat?.id,
    });
  }

  protected init(): void {
    this.setProps({ onModalOpen: this.props.onModalOpen });
    const onChooseBind = this.onChoose.bind(this);

    const AddFileModal = new AddFile({
      title: 'Загрузите аватар',
      onChoose: onChooseBind,
    });

    const onSendButtonClickBind = this.onSendButtonClick.bind(this);
    const onPropertiesButtonClickBind = this.onPropertiesButtonClick.bind(this);
    const onPinButtonClickBind = this.onPinButtonClick.bind(this);
    const onEnterbind = this.onEnter.bind(this);

    const MessageListComponent = new MessageList({
      messages: [],
      selectedChatUsers: [],
    });
    const PropertiesButton = new Button({
      isRound: true,
      theme: 'text',
      icon: '/assets/icons/properties.svg',
      type: 'button',
      onClick: onPropertiesButtonClickBind,
    });
    const PinButton = new Button({
      isRound: true,
      theme: 'text',
      icon: '/assets/icons/chat-pin.svg',
      type: 'button',
      onClick: onPinButtonClickBind,
    });
    const SendButton = new Button({
      isRound: true,
      icon: '/assets/icons/arrow-right-white.svg',
      type: 'button',
      onClick: onSendButtonClickBind,
    });
    const InputTextComponent = new InputText({
      name: 'message',
      placeholder: 'Сообщение',
      rounded: true,
      onEnter: onEnterbind,
    });
    const PropertiesDropdown = new DropDownList({
      list: [],
      appednTo: PropertiesButton.element,
    });
    const PinDropdown = new DropDownList({
      list: pinDropdownList,
      appednTo: PinButton.element,
    });

    this.children = {
      ...this.children,
      PropertiesButton,
      MessageListComponent,
      PinButton,
      InputTextComponent,
      SendButton,
      PropertiesDropdown,
      PinDropdown,
      AddFileModal,
    };
  }

  private async onChoose(file: File): Promise<void> {
    await updateChatAvatar(file);
  }

  private mapPropertiesToList(list: IDropDownItems): IDropDownList[] {
    const userId = this.props.user?.id;
    const chatCreatedUserId = this.props.selectedChat?.createdBy;
    const dropDownList: IDropDownList[] = [];
    const adminUser = userId === chatCreatedUserId;

    if (userId && chatCreatedUserId) {
      Object.entries(list).forEach(([key, item]) => {
        if (adminUser && key !== Modal.LEAVE_CHAT) {
          dropDownList.push({
            icon: item.icon,
            title: item.title,
            name: item.name,
            onClick: this.setModalClickFunction(item.name, item.modalDescription),
          });
          return;
        }
        if (!adminUser && key === Modal.LEAVE_CHAT) {
          dropDownList.push({
            icon: item.icon,
            title: item.title,
            name: item.name,
            onClick: this.setModalClickFunction(item.name, item.modalDescription),
          });
        }
      });
    }

    return dropDownList;
  }

  private setModalClickFunction(modalName: string, modalDescription: Record<string, unknown>): () => void {
    let onClick = (): void => {};

    if (modalName === Modal.ADD_USER) {
      onClick = (): void => {
        const modalState: IModalAddUser = {
          ...modalDescription,
          onClick: (value: number) => this.addChatUser(value),
        };
        openAddUserModal(modalState);
      };
    }

    if (modalName === Modal.REMOVE_USER) {
      onClick = (): void => {
        const modalRemoveUser: IModalRemoveUser = {
          ...modalDescription,
          chatId: this.props.selectedChat?.id,
        };
        openRemoveUserModal(modalRemoveUser);
      };
    }

    if (modalName === Modal.CHANGE_AVATAR) {
      onClick = (): void => {
        this.children.AddFileModal.setProps({ visible: true });
        // const modalRemoveUser: IModalRemoveUser = {
        //   ...modalDescription,
        //   chatId: this.props.selectedChat?.id,
        // };
        // openRemoveUserModal(modalRemoveUser);
      };
    }

    if (modalName === Modal.REMOVE_CHAT) {
      onClick = ():void => {
        const modalState: IModalConfirm = {
          ...modalDescription,
          onConfirm: async () => {
            await deleteChat();
            closeConfirmModal();
          },
        };
        openConfirmModal(modalState);
      };
    }

    if (modalName === Modal.LEAVE_CHAT) {
      onClick = ():void => {
        const modalState: IModalConfirm = {
          ...modalDescription,
          onConfirm: async () => {
            const chatId = getSelectedChatId();
            const userId = getCurrentUserId();
            if (chatId && userId) {
              await leaveChat(chatId, userId);
              removeChatFromList(chatId);
            }
            closeConfirmModal();
          },
        };
        openConfirmModal(modalState);
      };
    }
    return onClick;
  }

  private addChatUser(id: number): void {
    const chatId = this.props.selectedChat?.id;
    if (!chatId || !id) {
      setGlobalError({}, 'Не возможно добавить пользователя. Ошибка получения идентифкатора.');
      return;
    }
    const newUser: IAddChatUser = {
      chatId,
      users: [id],
    };
    addChatUser(newUser);
  }

  private onPropertiesButtonClick(): void {
    const dropdown = this.children.PropertiesDropdown;
    if (dropdown instanceof DropDownList) {
      dropdown.showList('chatContent');
    }
  }

  private onPinButtonClick(): void {
    const dropdown = this.children.PinDropdown;
    if (dropdown instanceof DropDownList) {
      dropdown.showList('chatContent');
    }
  }

  private onSendButtonClick(): void {
    const inputText = (this.children.InputTextComponent as InputText);
    const message = inputText.getValue();

    if (message) {
      inputText.resetValue();
      this.sendMessage(message);
    }
  }

  private onEnter(content: string): void {
    const inputText = (this.children.InputTextComponent as InputText);
    inputText.resetValue();
    this.sendMessage(content);
  }

  private sendMessage(content: string): void {
    const { socket } = this.props;

    if (socket && content) {
      socket.send({ content, type: 'message' });
    }
  }

  private onMessage(message: IMessageType | IMessageType[]): void {
    const chatId = this.props.selectedChat?.id;
    showMessage(message, chatId);
  }

  protected componentDidUpdate(_oldProps: IChatContentProps, _newProps: IChatContentProps): boolean {
    const selectedChatOldValue = _oldProps.selectedChat ?? {};
    const selectedChatnewValue = _newProps.selectedChat ?? {};
    const hasData = selectedChatnewValue && Object.keys(selectedChatnewValue).length > 0;
    const { socket } = _newProps;

    if (!isEqual(selectedChatOldValue, selectedChatnewValue) && hasData) {
      createWebSocket();
      this.children.PropertiesDropdown.setProps({ list: this.mapPropertiesToList(chatPropertiesDropDown) });
    }

    if (socket) {
      socket.on(WSTransportEvent.MESSAGE, this.onMessage.bind(this));
    }
    return true;
  }

  protected render(): string {
    return ChatContentTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  selectedChat: state.selectedChat,
  user: state.user,
  isChatLoading: state.isChatLoading,
  socket: state.socket,
});

export default connect(mapStateToProps)(ChatContent);
