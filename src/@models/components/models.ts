import { IProps } from '../common';

export interface IInputProps extends IProps {
  type: string;
  classes?: string;
  name: string;
  id?: string;
  accept?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: () => void;
  onClick?: (event: Event) => void;
  onChange?: (event: Event) => void;
  events?: unknown;
  readonly?: boolean;
}

export interface IFieldProps extends IProps {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  error?: boolean;
  validate?: (value: string) => void;
  // onValidate?: () => void;
}

export interface IErrorLineProps extends IProps {
  classes: string;
  error?: string;
}

export interface IButtonProps extends IProps {
  type: string;
  isRectangle?: boolean;
  isLink?: boolean;
  isRound?: boolean;
  label?: string;
  icon?: string;
  theme?: string;
  onClick?: (event: Event) => void;
  // TODO тип any
  events?: Record<string, any>;
}
