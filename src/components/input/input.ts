import Block from '../../@core/Block';
import { IInputProps } from '../../@models/components';
import InputTemplate from './input.template';

export default class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        click: props.onClick,
        change: props.onChange,
      },
    });
  }

  render(): string {
    return InputTemplate;
  }
}
