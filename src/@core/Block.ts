// @ts-nocheck
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export type RefType = {
  [key: string]: Element | Block<object>
};

export interface BlockClass<P extends object, R extends RefType> extends Function {
  new (props: P): Block<P, R>;
  componentName?: string;
}

class Block<Props extends object, Refs extends RefType = RefType> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public id = uuid();

  protected props: Props;

  protected refs: Refs = {} as Refs;

  private children: Block<object>[] = [];

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  constructor(props: Props = {} as Props) {
    const eventBus = new EventBus();

    this.props = this._makePropsProxy(props);

    this.eventBus = (): EventBus => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {
  }

  _componentDidMount(): void {
    this._checkInDom();
    this.componentDidMount();
  }

  componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
  _checkInDom(): void {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _componentWillUnmount(): void {
    this.componentWillUnmount();
  }

  componentWillUnmount(): void {}

  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }

    const needUpdateProps = Object.keys(nextProps).some((key: string) => nextProps[key] !== this.props[key]);

    if (needUpdateProps) {
      Object.assign(this.props, nextProps);
    }
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    // сохранение значения поля инпут при ререндеринге
    const inputValue = this._element?.querySelector('input')?.value;

    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();

    // Восстановление значения поля инпут после ререндеринга
    if (inputValue && this._element) {
      const input = this._element.querySelector('input');
      if (input) {
        input.value = inputValue;
      }
    }
  }

  private compile(template: string, context: any): DocumentFragment {
    const contextAndStubs = { ...context, __refs: this.refs };

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content);
    });

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
      stub?.replaceWith(child.getContent()!);
    });

    return temp.content;
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  _makePropsProxy(props: any): ProxyConstructor<any> {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value): boolean {
        const oldTarget = { ...target };

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty(): void {
        throw new Error('Нет доступа');
      },
    });
  }

  show(): void {
    this.getContent()!.style.display = 'block';
  }

  hide(): void {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
