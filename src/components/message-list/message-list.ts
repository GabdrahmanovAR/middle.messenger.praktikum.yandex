import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IMessageGroupProps, IMessageListProps } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
import { IMessageType } from '../../@models/websocket';
import { IChatUser } from '../../api/model';
import { connect } from '../../utils/connect';
import isEqual from '../../utils/isEqual';
import { getLocaleTime } from '../../utils/time';
import MessageGroup from '../message-group/message-group';
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
    if (messageList.length > 0) {
      this.setProps({ messageList, empty: false });
    }
  }

  private messagesToElements(messages: IMessageType[]): Block<IMessageGroupProps>[] {
    const messageList: Block<IMessageGroupProps>[] = [];
    const messageGropByDate = new Map<string, Message[]>();

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
      const dateKey = new Date(messages[i].time).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

      if (messageGropByDate.has(dateKey)) {
        messageGropByDate.set(dateKey, [...messageGropByDate.get(dateKey) ?? [], message]);
      } else {
        messageGropByDate.set(dateKey, [message]);
      }
    }
    const messageListByDate: IMessageGroupProps[] = Array.from(messageGropByDate, ([date, messageGroup]) => ({ date, messageGroup }));
    messageListByDate.forEach((messagesByDate: IMessageGroupProps) => messageList.push(new MessageGroup({
      date: messagesByDate.date,
      messageGroup: messagesByDate.messageGroup,
    })));
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
    return MessageListTemplate;
  }
}

const mapStatetoProps = (state: DefaultAppState): Partial<DefaultAppState> => ({
  messages: state.messages,
  user: state.user,
  selectedChatUsers: state.selectedChatUsers,
});

export default connect(mapStatetoProps)(MessageList);
