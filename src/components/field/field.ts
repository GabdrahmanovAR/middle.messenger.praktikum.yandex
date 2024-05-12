import Block from '../../@core/Block';
import { IFieldProps } from '../../@models/components';
import { ErrorLine } from '../error-line';
import { Input } from '../input';
import FieldTemplate from './field.template';

export default class Field extends Block<IFieldProps> {
  private _timer: number | null = null;

  protected init(): void {
    const validateBind = this.validate.bind(this);
    const onInputBind = this.onInput.bind(this);

    const InputField = new Input({
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.label,
      classes: 'field__input',
      required: this.props.required,
      onBlur: validateBind,
      onInput: onInputBind,
    });
    const Error = new ErrorLine({
      classes: 'field__validation',
    });

    this.children = {
      ...this.children,
      InputField,
      Error,
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
      if (this.props.onInput) {
        this.props.onInput(input.value);
      }
    }, 500);
  }

  public getValue(withValidate = true): string | null {
    if (withValidate && !this.validate()) {
      return null;
    }

    const input = this.children.InputField.element;
    if (input instanceof HTMLInputElement) {
      return input.value;
    }
    return null;
  }

  private validate(): boolean {
    const inputValue = ((this.children.InputField as Input)?.element as HTMLInputElement).value;
    const validateMessage = this._props.validate?.(inputValue);

    if (validateMessage) {
      this.setProps({ error: true });
      this.children.Error?.setProps({ error: validateMessage });
      return false;
    }

    this.setProps({ error: undefined });
    this.children.Error?.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    return FieldTemplate;
  }
}
