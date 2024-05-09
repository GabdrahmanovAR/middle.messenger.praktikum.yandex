import Block from '../../@core/Block';
import { IErrorInfoProps } from '../../@models/components';
import Routes from '../../api/routes';
import { Button } from '../button';
import ErrorTemplate from './error-info.template';

export default class ErrorInfo extends Block<IErrorInfoProps> {
  protected init(): void {
    const onClickBind = this.onClick.bind(this);

    const ButtonComponent = new Button({
      label: 'Назад',
      type: 'button',
      isLink: true,
      onClick: onClickBind,
    });

    this.children = {
      ...this.children,
      ButtonComponent,
    };
  }

  private onClick(): void {
    window.router.go(Routes.LOGIN);
  }

  protected render(): string {
    return ErrorTemplate;
  }
}
