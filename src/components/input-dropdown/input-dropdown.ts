import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IInputDropDownProps } from '../../@models/components';
import { DropDownList } from '../dropdown-list';
import { ErrorLine } from '../error-line';
import { Input } from '../input';
import InputDropDownTemplate from './input-dropdown.template';

export default class InputDropdown extends Block<IInputDropDownProps> {
  private _timer: number | null = null;

  protected init(): void {
    const validateBind = this.validate.bind(this);
    const onInputBind = this.onInput.bind(this);
    const onMenuItemSelectBind = this.onMenuItemSelect.bind(this);

    const InputField = new Input({
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.label,
      classes: 'input-dropdown__input',
      required: this.props.required,
      onBlur: validateBind,
      onInput: onInputBind,
    });
    const Error = new ErrorLine({
      classes: 'input-dropdown__validation',
    });
    const DropDown = new DropDownList({
      appednTo: InputField.element,
      list: this.props.listItems ?? [],
      onMenuItemSelect: onMenuItemSelectBind,
    });

    this.children = {
      ...this.children,
      InputField,
      Error,
      DropDown,
    };
  }

  private onMenuItemSelect(value: string): void {
    console.log(value);
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

  public clear(): void {
    this.setProps({ error: undefined });
    this.children.InputField.setProps({ value: EMPTY_STRING });
    this.children.Error.setProps({ error: undefined });
  }

  private validate(): boolean {
    const inputValue = (this.children.InputField.element as HTMLInputElement).value;
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

  protected componentDidUpdate(_oldProps: IInputDropDownProps, _newProps: IInputDropDownProps): boolean {
    console.log('dropdown');
    const { listItems } = _newProps;
    if (listItems && listItems.length > 0) {
      this.children.DropDown.setProps({ visible: true, list: listItems });
    } else {
      this.children.DropDown.setProps({ visible: false, list: [] });
    }
    return true;
  }

  protected render(): string {
    return InputDropDownTemplate;
  }
}
