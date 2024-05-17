import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IInputTextProps } from '../../@models/components';
import { escapeHtml } from '../../utils/escapeHtml';
import Input from '../input/input';
import InputTextTemplate from './input-text.template';

export default class InputText extends Block<IInputTextProps> {
  private _timer: number | null = null;

  constructor(props: IInputTextProps) {
    super({
      ...props,
      onSearch: props.onSearch,
      onEnter: props.onEnter,
    });
  }

  protected init(): void {
    const onInputBind = this.onInput.bind(this);
    const onEnterBind = this.onEnter.bind(this);

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
      onEnter: onEnterBind,
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
        const escapedValue = escapeHtml(input.value);
        this.props.onSearch(escapedValue);
      }
    }, 500);
  }

  private onEnter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue && this.props.onEnter) {
      const escapedValue = escapeHtml(inputValue);
      this.props.onEnter(escapedValue);
    }
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
