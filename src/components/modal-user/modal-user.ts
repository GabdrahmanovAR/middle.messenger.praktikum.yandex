import Block from '../../@core/Block';
import { Button } from '../button';
import { Field } from '../field';
import ModalUserTemplate from './modal-user.template';
import * as validate from '../../utils/validate';

export interface IModalUser {
  title: string;
  fieldLabel: string;
  buttonLabel: string;
  visible?: boolean;
}

export default class ModalUser extends Block<IModalUser> {
  constructor(props: IModalUser) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            this.setProps({ visible: false });
          }
        },
      },
    });
  }

  protected init(): void {
    const onClickBind = this.onClick.bind(this);

    const FieldComponent = new Field({
      label: this.props.fieldLabel ? this.props.fieldLabel : 'Введите текст',
      type: 'text',
      name: 'user-edit',
      validate: validate.empty,
    });
    const ButtonComponent = new Button({
      type: 'submit',
      label: this.props.buttonLabel ? this.props.buttonLabel : 'Ок',
      isRectangle: true,
      onClick: onClickBind,
    });

    this.children = {
      ...this.children,
      FieldComponent,
      ButtonComponent,
    };
  }

  public updateChildrenState(): void {
    (this.children.FieldComponent as Field).setProps({ label: this.props.fieldLabel });
    (this.children.ButtonComponent as Button).setProps({ label: this.props.buttonLabel });
  }

  private onClick(event: Event): void {
    event.preventDefault();
    const value = (this.children.FieldComponent as Field).getValue();
    if (value) {
      console.log(value);
    }
  }

  protected render(): string {
    return ModalUserTemplate;
  }
}
