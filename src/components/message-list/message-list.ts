import Block from '../../@core/Block';
import { IMessageListProps } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
import { IMessageType } from '../../@models/websocket';
import { connect } from '../../utils/connect';
import isEqual from '../../utils/isEqual';
import { getLocaleTime } from '../../utils/time';
import Message from '../message/message';
import MessageListTemplate from './message-list.template';

class MessageList extends Block<IMessageListProps> {
  constructor(props: IMessageListProps) {
    super({
      ...props,
      empty: true,
    });
  }

  private createMessages(messages: IMessageType[]): void {
    const messageList = this.messagesToElements(messages);
    console.log(messageList);
    if (messageList.length > 0) {
      this.setProps({ messageList, empty: false });
    }
  }

  private messagesToElements(messages: IMessageType[]): Message[] {
    const messageList: Message[] = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const own = messages[i].user_id === this.props.user?.id;
      const first = i === messages.length - 1 ? true : (messages[i].user_id !== messages[i + 1].user_id);

      const message = new Message({
        message: messages[i].content,
        date: getLocaleTime(messages[i].time),
        own,
        send: !!own,
        first,
      });
      messageList.push(message);
    }
    return messageList;
  }

  protected componentDidUpdate(_oldProps: IMessageListProps, _newProps: IMessageListProps): boolean {
    if (!isEqual(_oldProps.messages ?? [], _newProps.messages ?? []) && _newProps.messages?.length > 0) {
      this.createMessages(_newProps.messages);
    }
    return true;
  }

  protected render(): string {
    // return `
    // <div class="message-list">
    //   ${this.props.messages?.map((messages: IMessages) => `
    //     <div class="message-list__date-group">
    //       <div class="sticky-date">
    //         <span class="sticky-date__text-date">${messages.date}</span>
    //       </div>

    //       <div>Заглушка для сообщений</div>
    //     </div>
    //   `).join('')}
    // </div>
    // `;
    return MessageListTemplate;
  }
}

const mapStatetoProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ messages: state.messages, user: state.user });

export default connect(mapStatetoProps)(MessageList);
