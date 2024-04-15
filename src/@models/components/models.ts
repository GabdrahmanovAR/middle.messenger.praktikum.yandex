export interface IInputProps {
  type: string;
  name: string;
  classes?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: () => void;
  events?: unknown;
}

export interface IFieldProps {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  validate?: (value: string) => void;
  onValidate?: () => void;
}

export interface IErrorLineProps {
  classes: string;
  error: string;
}

export interface IButtonProps {
  isRectangle?: boolean;
  isLink?: boolean;
  isRound?: boolean;
  label: string;
  type: string;
  onClick?: (event: Event) => void;
  // TODO тип any
  events?: Record<string, any>;
}
