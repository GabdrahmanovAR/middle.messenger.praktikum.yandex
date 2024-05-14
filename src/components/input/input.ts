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
        input: props.onInput,
        keyup: (event: Event) => {
          if (((event as KeyboardEvent).key === 'Enter' || (event as KeyboardEvent).keyCode === 13) && props.onEnter) {
            props.onEnter(event);
          }
        },
      },
    });
  }

  render(): string {
    return InputTemplate;
  }
}
