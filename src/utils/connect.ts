import Block from '../@core/Block';
import { StoreEvents } from '../@core/Store';
import { IProps } from '../@models/common';
import { DefaultAppState } from '../@models/store';
import isEqual from './isEqual';

export function connect(mapStateToProps: (state: DefaultAppState) => Partial<DefaultAppState>) {
  return function <T extends IProps>(Component: typeof Block<T>): typeof Block<T> {
    return class extends Component {
      constructor(props: T) {
        // сохраняем начальное состояние
        const { store } = window;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}
