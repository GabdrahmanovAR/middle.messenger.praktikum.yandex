import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

class Block<Props extends object> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    // FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public id = uuid();

  protected _props: Props;

  protected children: Block<Props>[] = [];

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: Props = {} as Props) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    this._props = this.makePropsProxy(props);
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
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      } else {
        throw new Error(`Отсутствует элемент. Невозможно добавить событие - ${eventName}`);
      }
    });
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount(): void {
    // this._checkInDom();
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(oldProps?: Props): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }

    const needUpdateProps = Object.keys(nextProps).some((key: string) => nextProps[key] !== this._props[key]);

    if (needUpdateProps) {
      Object.assign(this._props, nextProps);
    }
  };

  private _render(): void {
    // сохранение значения поля инпут при ререндеринге
    // const inputValue = this._element?.querySelector('input')?.value;

    const fragment = this.compile(this.render(), this._props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this.addEvents();

    // Восстановление значения поля инпут после ререндеринга
    // if (inputValue && this._element) {
    //   const input = this._element.querySelector('input');
    //   if (input) {
    //     input.value = inputValue;
    //   }
    // }
  }

  private compile(template: string, context: any): DocumentFragment {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
    // contextAndStubs.__children?.forEach(({ embed }: any) => {
    //   embed(temp.content);
    // });

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
      stub?.replaceWith(child.getContent()!);
    });

    return temp.content;
  }

  protected render(): string {
    return '';
  }

  protected getContent(): HTMLElement | null {
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

  private makePropsProxy(props: any): any {
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
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  private getChildrenAndProps(propsWithChildren: Props): Record<string, unknown> {
    const children: Record<string, Block<Props>> = {};
    const props: Props = {} as Props;

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof Props] = value;
      }
    });

    return { children, props };
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
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
