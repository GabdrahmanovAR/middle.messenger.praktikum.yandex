import Block from '../../@core/Block';
import { IDataFieldProps } from '../../@models/components';
import { ErrorLine } from '../error-line';
import { Input } from '../input';
import DataFieldTemplate from './data-field.template';

export default class DataField extends Block<IDataFieldProps> {
  constructor(props: IDataFieldProps) {
    super({
      ...props,
      onEditStateChange: (state: boolean) => (this.children.InputField as Input).setProps({ readonly: state }),
      onValueChange: () => {
        const input = (this.children.InputField as Input);
        const value = (input.element as HTMLInputElement)?.value;
        input.setProps({ value });
      },
    });
  }

  protected init(): void {
    const validateBind = this.validate.bind(this);

    const InputField = new Input({
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      classes: 'data-field__input',
      readonly: this.props.readonly,
      onBlur: validateBind,
    });
    const Error = new ErrorLine({
      classes: 'data-field__validation',
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

    const input = this.children.InputField.element;
    if (input instanceof HTMLInputElement) {
      return input.value;
    }
    return null;
  }

  public clearError(): void {
    // TODO поставить везде ? где вызывается метод у блока
    this.children.Error?.setProps({ error: undefined });
  }

  private validate(): boolean {
    const inputValue = ((this.children.InputField as Input)?.element as HTMLInputElement).value;
    const validateMessage = this.props.validate?.(inputValue);

    if (validateMessage) {
      (this.children.Error as ErrorLine)?.setProps({ error: validateMessage });
      return false;
    }

    (this.children.Error as ErrorLine)?.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    return DataFieldTemplate;
  }
}
