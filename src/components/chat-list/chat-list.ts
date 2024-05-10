import Block from '../../@core/Block';
import { IChatListProps } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
import { connect } from '../../utils/connect';
import { ChatCard } from '../chat-card';
import ChatListTemplate from './chat-list.template';

class ChatList extends Block<IChatListProps> {
  protected init(): void {
    const onChatCardClickBind = this.onChatCardClick.bind(this);
    const keys = Object.keys(this.children);

    keys.forEach((key: string) => {
      const component = this.children[key];
      if (component instanceof ChatCard) {
        if (component.props.active) {
          this.setProps({ currentActive: component.props.id });
        }
        component?.setProps({ onClick: onChatCardClickBind });
        component.updateOnClick();
      }
    });
  }

  private onChatCardClick(value: string): void {
    const { currentActive } = this.props;
    if (currentActive && currentActive !== value) {
      this.children[currentActive]?.setProps({ active: false });
      this.children[value]?.setProps({ active: true });
      this.setProps({ currentActive: value });
    }
  }

  protected render(): string {
    return ChatListTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ isLoading: state.isLoading });

export default connect(mapStateToProps)(ChatList);
