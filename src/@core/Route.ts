import { IProps } from '../@models/common';
import { IRouteProps } from '../@models/route';
import Block from './Block';

export default class Route<T extends IProps = IProps> {
  private _pathname: string;

  private _blockClass: typeof Block<T> | null;

  private _block: Block<T> | null;

  private _props: IRouteProps;

  constructor(pathname: string, view: typeof Block<T> | null, props: IRouteProps) {
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
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block && this._blockClass) {
      this._block = new this._blockClass();
      this._render(this._props.rootQuery, this._block);
      return;
    }

    this._block?.show();
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

  public clear(): void {
    const root = document.querySelector(this._props.rootQuery);
    if (!root) {
      throw new Error('Ошибка удаления из dom-дерева');
    }

    if (this._block) {
      const content: HTMLElement | null = this._block.getContent();
      if (content) {
        root.removeChild(content);
      }
      this._block = null;
    }
  }
}
