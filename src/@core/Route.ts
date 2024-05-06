import { IProps } from '../@models/common';
import isEqual from '../utils/isEqual';
import Block from './Block';

interface IRouteProps {
  rootQuery: string;
  viewProps?: IProps;
}

export default class Route {
  private _pathname: string;

  private _blockClass: Block<Record<string, unknown>> | null;

  private _block: Block<Record<string, unknown>> | null;

  private _props: IRouteProps;

  constructor(pathname: string, view: Block<Record<string, unknown>> | null, props: IRouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._props.viewProps);
      this._render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }

  private _render(query: string, block: Block<Record<string, unknown>>): Element | null {
    const root = document.querySelector(query);
    const content: HTMLElement | null = block.getContent();
    if (root && content) {
      root.append(content);
      return root;
    }
    return null;
  }
}
