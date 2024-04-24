import Block from '../../@core/Block';
import { IMessageListProps, IMessages } from '../../@models/components';

export default class MessageList extends Block<IMessageListProps> {
  protected render(): string {
    return `
    <div class="message-list">
      ${this.props.messages?.map((messages: IMessages) => `
        <div class="message-list__date-group">
          <div class="sticky-date">
            <span class="sticky-date__text-date">${messages.date}</span>
          </div>

          <div>Заглушка для сообщений</div>
      
        </div>
      `).join('')}
    </div>
    `;
  }
}
