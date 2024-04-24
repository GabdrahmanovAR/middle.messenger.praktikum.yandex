import Block from '../../@core/Block';
import { IChatListProps, IChatList } from '../../@models/components';
import { ChatCard } from '../chat-card';
import ChatListTemplate from './chat-list.template';

export default class ChatList extends Block<IChatListProps> {
  constructor(props: IChatListProps) {
    const registrationFields = props.chatList.reduce((acc: Record<string, ChatCard>, data: IChatList) => {
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
        component?.setProps({ onClick: onChatCardClickBind });
        component.updateOnClick();
      }
    });
  }

  private onChatCardClick(value: string): void {
    const { currentActive } = this.props;
    if (currentActive && currentActive !== value) {
      this.children[currentActive]?.setProps({ active: false });
      this.children[value]?.setProps({ active: true });
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
