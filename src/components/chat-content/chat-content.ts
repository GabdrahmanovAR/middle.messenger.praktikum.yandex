import { IChatList } from '../../pages/chat/chat-list.const';
import Block from '../../@core/Block';
import { Button } from '../button';
import { InputText } from '../input-text';
import { MessageList } from '../message-list';
import { messages } from '../message-list/message-list.const';
import ChatContentTemplate from './chat-content.template';
import { DropDownList } from '../dropdown-list';
import { pinDropdownList, propertiesDropdownList } from '../dropdown-list/dropdown-list.const';

interface IChatContentProps {
  chatInfo: IChatList;
  onModalOpen: (itemName: string) => void;
}

export default class ChatContent extends Block<IChatContentProps> {
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
      onMenuItemSelect: (itemName: string): void => {
        this.props.onModalOpen(itemName);
      },
    });
    const PinDropdown = new DropDownList({
      list: pinDropdownList,
      appednTo: PinButton.element,
      onMenuItemSelect: (value: string): void => {
        this.props.onModalOpen(value);
      },
    });

    this.children = {
      ...this.children,
      MessageListComponent,
      PropertiesButton,
      PinButton,
      SendButton,
      InputTextComponent,
      PropertiesDropdown,
      PinDropdown,
    };
  }

  private onPropertiesButtonClick(): void {
    (this.children.PropertiesDropdown as DropDownList).show();
  }

  private onPinButtonClick(): void {
    if (this.element) {
      (this.children.PinDropdown as DropDownList).show();
    }
  }

  private onSendButtonClick(): void {
    const inputText = (this.children.InputTextComponent as InputText);
    const message = inputText.getValue();
    if (message) {
      console.log(message);
      inputText.resetValue();
    }
  }

  protected render(): string {
    return ChatContentTemplate;
  }
}
