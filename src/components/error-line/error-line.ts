import Block from '../../@core/Block';
import { IErrorLineProps } from '../../@models/components';
import ErrorLineTemplate from './error-line.template';

export default class ErrorLine extends Block<IErrorLineProps> {
  protected render(): string {
    return ErrorLineTemplate;
  }
}
