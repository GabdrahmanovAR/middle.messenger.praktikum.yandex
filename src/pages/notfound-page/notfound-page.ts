import Block from '../../@core/Block';
import { ErrorInfo } from '../../components';
import ErrorPageTemplate from './notfound-page.template';

export default class NotfoundPage extends Block {
  protected init(): void {
    const ErrorComponent = new ErrorInfo({
      code: '404',
      info: 'Страница не найдена',
    });

    this.children = {
      ...this.children,
      ErrorComponent,
    };
  }

  protected render(): string {
    return ErrorPageTemplate;
  }
}
