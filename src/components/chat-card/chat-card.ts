import Block from '../../@core/Block';
import ChatCardTemplate from './chat-card.template';

interface IChatCardProps {
  id: string;
  name: string
  active?: boolean;
  avatar?: string;
  message?: string;
  date?: string;
  count?: string;
  onClick?: (value: string | null) => void;
  events?: any;
}

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
          // if (this.props.active && this.props.onClick) {
          //   this.props.onClick(this.props.id);
          //   return;
          // }

          // if (this.props.onClick) {
          //   this.props.onClick(null);
          // }
        },
      },
    });
  }

  protected render(): string {
    return ChatCardTemplate;
  }
}
