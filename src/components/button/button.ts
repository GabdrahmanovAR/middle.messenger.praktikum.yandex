import Block from '../../@core/Block';
import { IButtonProps } from '../../@models/components';
import ButtonTemplate from './button.template';

export default class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return ButtonTemplate;
  }
}
