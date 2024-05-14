import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IChatCardProps, ISelectedChat } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
import { selectChat } from '../../services/chat.service';
import { connect } from '../../utils/connect';
import isEqual from '../../utils/isEqual';
import ChatCardTemplate from './chat-card.template';

class ChatCatd extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super({
      ...props,
      events: {
        click: (): void => {
          const selectedChatProps: ISelectedChat = {
            id: props.id,
            title: props.name,
            avatar: props.avatar ?? EMPTY_STRING,
            createdBy: props.createdBy,
          };
          selectChat(selectedChatProps);
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

  protected componentDidUpdate(_oldProps: IChatCardProps, _newProps: IChatCardProps): boolean {
    const { selectedChat } = _newProps;
    const hasData = selectedChat && Object.keys(selectedChat).length > 0;
    const notEqual = !isEqual((_oldProps.selectedChat ?? {}), selectedChat ?? {});
    if (hasData && notEqual) {
      this.setProps({ active: this.props.id === selectedChat.id });
    }
    return true;
  }

  protected render(): string {
    return ChatCardTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ selectedChat: state.selectedChat });

export default connect(mapStateToProps)(ChatCatd);
