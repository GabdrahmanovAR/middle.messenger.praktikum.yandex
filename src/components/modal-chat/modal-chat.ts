import Block from '../../@core/Block';
import { Button } from '../button';
import { Field } from '../field';
import ModalChatTemplate from './modal-chat.template';
import * as validate from '../../utils/validate';
import { IModalChat } from '../../@models/components';
import { connect } from '../../utils/connect';
import { closeModal } from '../../services/modal.service';
import { DefaultAppState } from '../../@models/store';
import isEqual from '../../utils/isEqual';

class ModalChat extends Block<IModalChat> {
  constructor(props: IModalChat) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            closeModal();
          }
        },
      },
    });
  }

  protected init(): void {
    const onClickBind = this.onClick.bind(this);

    const FieldComponent = new Field({
      label: this.props?.fieldLabel ?? 'Введите текст',
      type: 'text',
      name: this.props?.fieldName ?? 'modal-field',
      validate: validate.empty,
    });
    const ButtonComponent = new Button({
      type: 'submit',
      label: this.props?.buttonLabel ?? 'Ок',
      isRectangle: true,
      onClick: onClickBind,
    });

    this.children = {
      ...this.children,
      FieldComponent,
      ButtonComponent,
    };
  }

  private onClick(event: Event): void {
    event.preventDefault();
    const field = this.children.FieldComponent;
    const value = (field instanceof Field) && field.getValue();

    if (value) {
      console.log(value);
    }
  }

  protected componentDidUpdate(_oldProps: IModalChat, _newProps: IModalChat): boolean {
    if (!isEqual(_oldProps, _newProps)) {
      this.children.FieldComponent.setProps({
        label: _newProps.fieldLabel,
        name: _newProps.fieldName,
      });
      this.children.ButtonComponent.setProps({ label: _newProps.buttonLabel });
    }
    return true;
  }

  protected render(): string {
    return ModalChatTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ ...state.modalState });

export default connect(mapStateToProps)(ModalChat);
