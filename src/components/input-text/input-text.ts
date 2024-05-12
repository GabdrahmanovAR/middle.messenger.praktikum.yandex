import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IInputTextProps } from '../../@models/components';
import Input from '../input/input';
import InputTextTemplate from './input-text.template';

export default class InputText extends Block<IInputTextProps> {
  private _timer: number | null = null;

  constructor(props: IInputTextProps) {
    super({
      ...props,
      onSearch: props.onSearch,
    });
  }

  protected init(): void {
    const onInputBind = this.onInput.bind(this);
    const InputField = new Input({
      type: 'text',
      name: this.props.name,
      placeholder: this.props.placeholder,
      classes: `
        input-text
        ${this.props.rounded ? ' input-text_rounded' : EMPTY_STRING}
        ${this.props.center ? ' input-text_center' : EMPTY_STRING}
      `,
      onInput: onInputBind,
    });

    this.children = {
      ...this.children,
      InputField,
    };
  }

  private onInput(event: Event): void {
    const input = event.target instanceof HTMLInputElement ? event.target : null;

    if (!input) {
      return;
    }

    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(() => {
      if (this.props.onSearch) {
        this.props.onSearch(input.value);
      }
    }, 500);
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
