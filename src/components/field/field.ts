import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IFieldProps } from '../../@models/components';
import { escapeHtml } from '../../utils/escapeHtml';
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
        const escapedValue = escapeHtml(input.value);
        this.props.onInput(escapedValue);
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

  public updateValue(value: string): void {
    const input = this.children.InputField.element;
    if (input instanceof HTMLInputElement) {
      input.value = value;
    }
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

  public clear(): void {
    this.setProps({ error: undefined });
    this.children.InputField.setProps({ value: EMPTY_STRING });
    this.children.Error.setProps({ error: undefined });
  }

  public componentDidUpdate(_oldProps: IFieldProps, _newProps: IFieldProps): boolean {
    if (_oldProps.name !== _newProps.name) {
      this.children.InputField.setProps({ name: _newProps.name });
    }
    return true;
  }

  protected render(): string {
    return FieldTemplate;
  }
}
