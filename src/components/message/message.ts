import Block from '../../@core/Block';
import { IMessageProps } from '../../@models/components';
import MessageTemplate from './message.template';

export default class Message extends Block<IMessageProps> {
  protected render(): string {
    return MessageTemplate;
  }
}
