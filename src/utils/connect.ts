import Block from '../@core/Block';
import { StoreEvents } from '../@core/Store';
import { IProps } from '../@models/common';
import { DefaultAppState } from '../@models/store';
import isEqual from './isEqual';

export function connect(mapStateToProps: (state: DefaultAppState) => Partial<DefaultAppState>) {
  return function <T extends IProps>(Component: typeof Block<T>): typeof Block<T> {
    return class extends Component {
      constructor(props: T) {
        const { store } = window;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}
