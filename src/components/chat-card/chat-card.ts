import Block from '../../@core/Block';
import { IChatCardProps } from '../../@models/components';
import ChatCardTemplate from './chat-card.template';

export default class ChatCatd extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super({
      ...props,
      events: {
        click: (): void => {
          if (props.onClick) {
            props.onClick(props.id);
          }
        },
      },
    });
  }

  public updateOnClick(): void {
    this.setProps({
      events: {
        click: (): void => {
          if (this.props.onClick) {
            this.props.onClick(this.props.id);
          }
        },
      },
    });
  }

  protected render(): string {
    return ChatCardTemplate;
  }
}
