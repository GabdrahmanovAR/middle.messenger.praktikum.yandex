import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import Input from '../input/input';
import InputTextTemplate from './input-text.template';

interface IInputTextProps {
  name: string;
  rounded?: boolean;
  center?: boolean;
  placeholder?: string;
  icon?: string;
}

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
    return ((this.children.InputField as Input)?.element as HTMLInputElement).value;
  }

  public resetValue(): void {
    // (this.children.InputField as Input).setProps({ value: '' });
    ((this.children.InputField as Input)?.element as HTMLInputElement).value = '';
  }

  protected render(): string {
    return InputTextTemplate;
  }
}
