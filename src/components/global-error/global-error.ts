import Block from '../../@core/Block';
import { DefaultAppState } from '../../@models/common';
import { IGlobalErrorProps } from '../../@models/components';
import { clearGlobalError } from '../../services/global-error.service';
import { connect } from '../../utils/connect';
import { Button } from '../button';
import GlobalErrorTemplate from './global-error.template';

class GlobalError extends Block<IGlobalErrorProps> {
  constructor(props: IGlobalErrorProps) {
    super({
      ...props,
      closeIcon: props.closeIcon ?? '/assets/icons/close_icon.svg',
    });
  }

  protected init(): void {
    const onCloseBind = this.onClose.bind(this);

    const CloseButton = new Button({
      type: 'button',
      isRound: true,
      icon: this.props.closeIcon,
      theme: 'text',
      onClick: onCloseBind,
    });

    this.children = {
      CloseButton,
    };
  }

  private onClose(): void {
    clearGlobalError();
  }

  protected render(): string {
    return GlobalErrorTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ globalError: state.globalError });

export default connect(mapStateToProps)(GlobalError);
