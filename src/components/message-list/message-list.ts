import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IMessageListProps } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
import { IMessageType } from '../../@models/websocket';
import { IChatUser } from '../../api/model';
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
      const name = own ? EMPTY_STRING : this.findUserName(messages[i].user_id);

      const message = new Message({
        message: messages[i].content,
        date: getLocaleTime(messages[i].time),
        own,
        send: messages[i].is_read ? false : !!own,
        read: own ? messages[i].is_read : false,
        first,
        name,
      });
      messageList.push(message);
    }
    return messageList;
  }

  private findUserName(userId: number): string {
    const { selectedChatUsers } = this.props;
    if (selectedChatUsers && selectedChatUsers.length > 0) {
      const user = selectedChatUsers.find((chatUser: IChatUser) => chatUser.id === userId);
      return user ? user.first_name : EMPTY_STRING;
    }
    return EMPTY_STRING;
  }

  protected componentDidUpdate(_oldProps: IMessageListProps, _newProps: IMessageListProps): boolean {
    const oldMessages = _oldProps.messages ?? [];
    const newMessages = _newProps.messages ?? [];

    if (!isEqual(oldMessages, newMessages)) {
      if (newMessages.length > 0) {
        this.createMessages(newMessages);
      } else {
        this.setProps({ messageList: [], empty: true });
      }
    }
    return true;
  }

  protected componentAfterUpdate(): void {
    const msgList = document.getElementById('message-list');
    if (msgList) {
      msgList.scrollTop = msgList.scrollHeight;
    }
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

const mapStatetoProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  messages: state.messages,
  user: state.user,
  selectedChatUsers: state.selectedChatUsers,
});

export default connect(mapStatetoProps)(MessageList);
