import Block from '../../@core/Block';
import { IMessageListProps } from '../../@models/components';

export default class MessageList extends Block<IMessageListProps> {
  protected render(): string {
    return `
    <div class="message-list">
      <div>MessagesList</div>
    </div>
    `;
  }
}
// TODO добить список сообщений?
// ${this.props.messages?.map((messages: IMessages) => `
//   <div class="message-list__date-group">
//   <div class="sticky-date">
//     <span class="sticky-date__text-date">{{this.date}}</span>
//   </div>

//   {{#each this.messageGroup}}
//     <div class="message-list__message-group">
//       {{#each this.group}}
//         {{> Message }}
//       {{/each}}
//     </div>
//   {{/each}}

// </div>
// `).join('')}
