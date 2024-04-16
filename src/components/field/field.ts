import Block from '../../@core/Block';
import { IFieldProps } from '../../@models/components';
import { ErrorLine } from '../error-line';
import { Input } from '../input';
import FieldTemplate from './field.template';

export default class Field extends Block<IFieldProps> {
  constructor(props: IFieldProps) {
    super({
      ...props,
      onValidate: () => this.validate(),
    });
  }

  protected init(): void {
    const validateBind = this.validate.bind(this);

    const InputField = new Input({
      type: this._props.type,
      name: this._props.name,
      placeholder: this._props.label,
      classes: 'field__input',
      required: this._props.required,
      onBlur: validateBind,
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

  public getValue(withValidate = true): string | null {
    if (withValidate && !this.validate()) {
      return null;
    }

    return ((this.children.InputField as Input)?.element as HTMLInputElement).value;
  }

  private validate(): boolean {
    const inputValue = ((this.children.InputField as Input)?.element as HTMLInputElement).value;
    const validateMessage = this._props.validate?.(inputValue);

    if (validateMessage) {
      this.setProps({ error: true });
      (this.children.Error as ErrorLine)?.setProps({ error: validateMessage });
      return false;
    }

    this.setProps({ error: undefined });
    (this.children.Error as ErrorLine)?.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    return FieldTemplate;
  }
}
