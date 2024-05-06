import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

export default class Store<State extends Record<string, any> = Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
