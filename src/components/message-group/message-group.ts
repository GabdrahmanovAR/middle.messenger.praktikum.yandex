import Block from '../../@core/Block';
import { IMessageGroupProps } from '../../@models/components';
import MessageGroupTemplate from './message-group.template';

export default class MessageGroup extends Block<IMessageGroupProps> {
  protected init(): void {
    this.checkDate(this.props.date);
  }

  private checkDate(date: string): void {
    const now = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    if (date === now) {
      this.setProps({ date: 'Сегодня' });
    }
  }

  protected render(): string {
    return MessageGroupTemplate;
  }
}
