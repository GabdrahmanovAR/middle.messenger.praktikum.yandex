import Block from '../../@core/Block';
import MessageTemplate from './message.template';

interface IMessageProps {
  own?: boolean;
  first?: boolean;
  image?: string;
  message?: string;
  send?: boolean;
  delivered?: boolean;
  read?: boolean;
  date?: string;
}

export default class Message extends Block<IMessageProps> {
  protected render(): string {
    return MessageTemplate;
  }
}
