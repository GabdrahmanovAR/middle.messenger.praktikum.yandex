import Block from '../../@core/Block';
import { ErrorLine } from '../error-line';
import { Input } from '../input';
import DataFieldTemplate from './data-field.template';

interface IDataFieldProps {
  type: string;
  label: string;
  value: string;
  name: string;
  editable?: boolean;
  last?: boolean;
  validate?: (value: string) => void;
  onEditStateChange?: (state: boolean) => void;
  onValueChange?: () => void;
}

export default class DataField extends Block<IDataFieldProps> {
  constructor(props: IDataFieldProps) {
    super({
      ...props,
      onEditStateChange: (state: boolean) => (this.children.InputField as Input).setProps({ editable: state }),
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
      editable: this.props.editable,
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

    return ((this.children.InputField as Input)?.element as HTMLInputElement).value;
  }

  public clearError(): void {
    (this.children.Error as ErrorLine)?.setProps({ error: undefined });
  }

  private validate(): boolean {
    console.log('validate');
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
