import { DefaultAppState } from '../@models/common';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

export default class Store<State extends Record<string, any> = Record<string, any>> extends EventBus {
  private state: State = {} as State;

  private defaultState: State = {} as State;

  constructor(initialState: State) {
    super();

    this.state = initialState;
    this.defaultState = initialState;
    this.set(initialState);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  /**
   * Сброс состояния хранилища в начальное состояние
   * @param save сохранение состояний для необходимых полей
   */
  public reset(save?: Partial<DefaultAppState>): void {
    this.state = { ...this.defaultState, ...save };
  }
}
