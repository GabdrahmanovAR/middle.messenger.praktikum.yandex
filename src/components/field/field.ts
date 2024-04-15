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

  public getValue(): string | null {
    if (!this.validate()) {
      return null;
    }

    return ((this.refs.input as Input)?.element as HTMLInputElement).value;
  }

  private validate(): boolean {
    const inputValue = ((this.refs.input as Input)?.element as HTMLInputElement).value;
    const validateMessage = this.props.validate?.(inputValue);

    if (validateMessage) {
      this.setProps({ error: true });
      (this.refs.errorLine as ErrorLine)?.setProps({ error: validateMessage });
      return false;
    }

    this.setProps({ error: undefined });
    (this.refs.errorLine as ErrorLine)?.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    return FieldTemplate;
  }
}
