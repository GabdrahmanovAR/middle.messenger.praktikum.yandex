import Block from '../../@core/Block';
import { IChatListProps } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
import { connect } from '../../utils/connect';
import ChatListTemplate from './chat-list.template';

class ChatList extends Block<IChatListProps> {
  protected render(): string {
    return ChatListTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ isLoading: state.isLoading });

export default connect(mapStateToProps)(ChatList);
