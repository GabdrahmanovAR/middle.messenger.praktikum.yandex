import Block from '../../../@core/Block';
import { Button } from '../../button';
import ModalConfirmTemplate from './modal-confirm.template';
import { IModalConfirm } from '../../../@models/components';
import { connect } from '../../../utils/connect';
import { closeConfirmModal } from '../../../services/modal.service';
import { DefaultAppState } from '../../../@models/store';
import isEqual from '../../../utils/isEqual';

class ModalConfirm extends Block<IModalConfirm> {
  constructor(props: IModalConfirm) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            closeConfirmModal();
          }
        },
      },
    });
  }

  protected init(): void {
    const onConfirmBind = this.onConfirm.bind(this);
    const onCancelBind = this.onCancel.bind(this);

    const ConfirmButton = new Button({
      type: 'button',
      label: 'Подтвердить',
      isRectangle: true,
      onClick: onConfirmBind,
    });
    const CancelButton = new Button({
      type: 'button',
      label: 'Отмена',
      isRectangle: true,
      theme: 'second',
      onClick: onCancelBind,
    });

    this.children = {
      ...this.children,
      ConfirmButton,
      CancelButton,
    };
  }

  private onConfirm(): void {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  private onCancel(): void {
    closeConfirmModal();
  }

  public componentDidUpdate(_oldProps: IModalConfirm, _newProps: IModalConfirm): boolean {
    const prevModalState = _oldProps.modalConfirm ?? {};
    const nextModalState = _newProps.modalConfirm ?? {};

    if (!isEqual(prevModalState, nextModalState)) {
      this.setProps({ ...nextModalState as IModalConfirm });
    }
    return true;
  }

  protected render(): string {
    return ModalConfirmTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ modalConfirm: state.modalConfirm });

export default connect(mapStateToProps)(ModalConfirm);
