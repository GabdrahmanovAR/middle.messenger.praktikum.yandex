import Block from '../../@core/Block';
import { Button } from '../button';
import { InputText } from '../input-text';
import { MessageList } from '../message-list';
import { messages } from '../message-list/message-list.const';
import ChatContentTemplate from './chat-content.template';
import { DropDownList } from '../dropdown-list';
import { pinDropdownList, propertiesDropdownList } from '../dropdown-list/dropdown-list.const';
import { IChatContentProps } from '../../@models/components';
import { connect } from '../../utils/connect';
import { DefaultAppState } from '../../@models/store';
import isEqual from '../../utils/isEqual';
import { createWebSocket, sendMessage } from '../../services/websocket.service';

class ChatContent extends Block<IChatContentProps> {
  constructor(props: IChatContentProps) {
    super({
      ...props,
      showChat: !!props.selectedChat?.id,
    });
  }

  protected init(): void {
    this.setProps({ onModalOpen: this.props.onModalOpen });

    const onSendButtonClickBind = this.onSendButtonClick.bind(this);
    const onPropertiesButtonClickBind = this.onPropertiesButtonClick.bind(this);
    const onPinButtonClickBind = this.onPinButtonClick.bind(this);

    const MessageListComponent = new MessageList({
      messages,
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
    });
    const PropertiesDropdown = new DropDownList({
      list: propertiesDropdownList,
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
    };
  }

  private onPropertiesButtonClick(): void {
    const dropdown = this.children.PropertiesDropdown;
    if (dropdown instanceof DropDownList) {
      dropdown.show();
    }
  }

  private onPinButtonClick(): void {
    const dropdown = this.children.PinDropdown;
    if (dropdown instanceof DropDownList) {
      dropdown.show();
    }
  }

  private onSendButtonClick(): void {
    const inputText = (this.children.InputTextComponent as InputText);
    const message = inputText.getValue();
    if (message) {
      console.log(message);
      inputText.resetValue();
      sendMessage(message);
    }
  }

  protected componentDidUpdate(_oldProps: IChatContentProps, _newProps: IChatContentProps): boolean {
    const { selectedChat } = _newProps;
    const hasData = selectedChat && Object.keys(selectedChat).length > 0;
    if (hasData) {
      console.log('CREATE WEBSOCKET');
      createWebSocket();
    }
    return true;
  }

  protected render(): string {
    return ChatContentTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ selectedChat: state.selectedChat });

export default connect(mapStateToProps)(ChatContent);
