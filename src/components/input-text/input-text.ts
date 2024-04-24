import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IInputTextProps } from '../../@models/components';
import Input from '../input/input';
import InputTextTemplate from './input-text.template';

export default class InputText extends Block<IInputTextProps> {
  protected init(): void {
    const InputField = new Input({
      type: 'text',
      name: this.props.name,
      placeholder: this.props.placeholder,
      classes: `
        input-text
        ${this.props.rounded ? ' input-text_rounded' : EMPTY_STRING}
        ${this.props.center ? ' input-text_center' : EMPTY_STRING}
      `,
    });

    this.children = {
      ...this.children,
      InputField,
    };
  }

  public getValue(): string {
    const input = this.children.InputField.element;
    if (input instanceof HTMLInputElement) {
      return input.value;
    }
    return EMPTY_STRING;
  }

  public resetValue(): void {
    const input = this.children.InputField.element;
    if (input instanceof HTMLInputElement) {
      input.value = EMPTY_STRING;
    }
  }

  protected render(): string {
    return InputTextTemplate;
  }
}
