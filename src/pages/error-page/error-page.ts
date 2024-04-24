import Block from '../../@core/Block';
import { INotfoundPageProps } from '../../@models/pages';
import { ErrorInfo } from '../../components';
import ErrorPageTemplate from './error-page.template';

export default class NotFoundPage extends Block<INotfoundPageProps> {
  protected init(): void {
    const ErrorComponent = new ErrorInfo({
      code: this.props.code,
      info: this.props.info,
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
