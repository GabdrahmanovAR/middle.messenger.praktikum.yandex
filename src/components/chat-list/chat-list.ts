import Block from '../../@core/Block';
import { IChatList } from '../../pages/chat/chat-list.const';
import { ChatCard } from '../chat-card';
import ChatListTemplate from './chat-list.template';

interface IChatListProps {
  chatList: IChatList[];
  fieldKeys?: string[];
  currentActive?: string;
}

export default class ChatList extends Block<IChatListProps> {
  constructor(props: IChatListProps) {
    const registrationFields = props.chatList.reduce((acc, data: IChatList) => {
      const component = new ChatCard({
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        count: data.count,
        active: data.active,
        date: data.date,
        message: data.message,
      });
      acc[data.id] = component;
      return acc;
    }, {});

    super({
      ...props,
      fieldKeys: Object.keys(registrationFields),
      ...registrationFields,
    });
  }

  protected init(): void {
    const onChatCardClickBind = this.onChatCardClick.bind(this);
    const keys = Object.keys(this.children);

    keys.forEach((key: string) => {
      const component = this.children[key];
      if (component instanceof ChatCard) {
        if (component.props.active) {
          this.setProps({ currentActive: component.props.id });
        }
        component.setProps({ onClick: onChatCardClickBind });
        component.updateOnClick();
      }
    });
  }

  private onChatCardClick(value: string): void {
    const { currentActive } = this.props;
    if (currentActive && currentActive !== value) {
      (this.children[currentActive] as ChatCard).setProps({ active: false });
      (this.children[value] as ChatCard).setProps({ active: true });
      this.setProps({ currentActive: value });
    }
  }

  protected render(): string {
    if (this.props.fieldKeys && this.props.fieldKeys.length > 0) {
      const chatCards = this.props.fieldKeys.map((key: string) => `
      <li class="chat-list__item">
        {{{ ${key} }}}
      </li>
      `).join('');
      return ChatListTemplate.replace('#chatList', chatCards);
    }

    return ChatListTemplate;
  }
}
