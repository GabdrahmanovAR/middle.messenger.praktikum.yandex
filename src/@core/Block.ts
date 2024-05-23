import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { IProps, TEvents } from '../@models/common';
import { sanitizeHtml } from '../utils/sanitizeHtml';

interface IPropsNChildren {
  children: Record<string, Block<IProps>>,
  props: Record<string, unknown>
}
class Block<Props extends IProps = IProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = uuid();

  protected _props: Props;

  protected children: Record<string, Block<IProps>>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: Props = {} as Props) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    this._props = this.makePropsProxy(props) as Props;
    this.children = children;

    this.eventBus = (): EventBus => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  public get element(): HTMLElement | null {
    return this._element;
  }

  public get props(): Props {
    return this._props;
  }

  private _init(): void {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {}

  private addEvents(): void {
    const { events = {} as TEvents } = this._props;

    Object.keys(events).forEach((eventName: string) => {
      const event = events[eventName as keyof DocumentEventMap];

      if (this._element && event) {
        this._element.addEventListener(eventName, event);
      }
    });
  }

  private removeEvents(): void {
    const { events = {} as TEvents } = this._props;

    Object.keys(events).forEach((eventName) => {
      const event = events[eventName as keyof DocumentEventMap];

      if (this._element && event) {
        this._element.removeEventListener(eventName, event);
      }
    });
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  public componentDidMount(_oldProps?: Props): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: Record<string, unknown>): void => {
    if (!nextProps) {
      return;
    }

    const needUpdateProps = Object.keys(nextProps).some((key: string) => nextProps[key] !== this._props[key]);

    if (needUpdateProps) {
      Object.assign(this._props, nextProps);
    }
  };

  private _render(): void {
    this.removeEvents();

    const propsAndStubs: Record<string, unknown> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const childrenProps: Block[] = [];
    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        propsAndStubs[key] = value.map((item) => {
          if (item instanceof Block) {
            childrenProps.push(item);
            return `<div data-id="${item.id}"></div>`;
          }

          return item;
        }).join('');
      }
    });
    const fragment = document.createElement('template');
    const template = this.render();

    const html = sanitizeHtml(Handlebars.compile(template)(propsAndStubs));
    fragment.innerHTML = html;
    const newElement = fragment.content.firstElementChild as HTMLElement;

    [...Object.values(this.children), ...childrenProps].forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      const content = child.getContent();
      if (content) {
        stub?.replaceWith(content);
      }
    });

    if (this._element && newElement) {
      newElement.style.display = this._element.style.display;
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this.addEvents();
    this._componentAfterUpdate();
  }

  public componentAfterUpdate(): void {}

  private _componentAfterUpdate(): void {
    this.componentAfterUpdate();
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement | null {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  private makePropsProxy(props: Record<string, unknown>): Record<string, unknown> {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string): void {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown): boolean {
        const oldTarget = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  private getChildrenAndProps(propsWithChildren: Props): IPropsNChildren {
    const children: Record<string, Block<IProps>> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'flex';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}

export default Block;
