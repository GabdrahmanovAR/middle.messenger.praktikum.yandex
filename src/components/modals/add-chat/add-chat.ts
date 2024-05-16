import Block from '../../../@core/Block';
import { Button } from '../../button';
import AddChatTemplate from './add-chat.template';
import { IModalChat } from '../../../@models/components';
import { connect } from '../../../utils/connect';
import { closeAddChatModal } from '../../../services/modal.service';
import { DefaultAppState } from '../../../@models/store';
import isEqual from '../../../utils/isEqual';
import * as validate from '../../../utils/validate';
import { Field } from '../../field';

class AddChat extends Block<IModalChat> {
  constructor(props: IModalChat) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            (this.children.FieldInput as Field).clear();
            closeAddChatModal();
          }
        },
      },
    });
  }

  protected init(): void {
    const onClickBind = this.onClick.bind(this);

    const FieldInput = new Field({
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
      FieldInput,
      ButtonComponent,
    };
  }

  private onClick(event: Event): void {
    event.preventDefault();
    const field = this.children.FieldInput;
    const value = (field instanceof Field) && field.getValue();

    if (value && this.props.onClick) {
      this.props.onClick(value);
      field.clear();
      closeAddChatModal();
    }
  }

  protected componentDidUpdate(_oldProps: IModalChat, _newProps: IModalChat): boolean {
    if (!isEqual(_oldProps, _newProps)) {
      this.children.FieldInput.setProps({
        label: _newProps.fieldLabel,
        name: _newProps.fieldName,
      });
      this.children.ButtonComponent.setProps({ label: _newProps.buttonLabel });
    }
    return true;
  }

  protected render(): string {
    console.log('render add chat');
    return AddChatTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ ...state.modalAddChat });

export default connect(mapStateToProps)(AddChat);
