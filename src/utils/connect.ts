import Block from '../@core/Block';
import { StoreEvents } from '../@core/Store';
import { DefaultAppState, IProps } from '../@models/common';
import isEqual from './isEqual';

export function connect(mapStateToProps: (state: DefaultAppState) => Partial<DefaultAppState>) {
  return function <T extends IProps>(Component: typeof Block): typeof Block {
    return class extends Component<T> {
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
