import { expect } from 'chai';
import { IProps } from '@models/common';
import sinon from 'sinon';
import Route from '../Route';
import Block from '../Block';

describe('Route', () => {
  let route: Route;
  let PageClass!: typeof Block<IProps>;
  const path = '/test';

  before(() => {
    class MockPage extends Block {
      protected render(): string {
        return '<div id="route-test"></div>';
      }
    }
    PageClass = MockPage;
  });

  beforeEach(() => {
    route = new Route(path, PageClass, { rootQuery: 'main#app' });
  });

  it('должен совпадать маршрут', () => {
    expect(route.match(path)).to.be.true;
  });

  it('должен вызвать метод render при переходе на указанный маршрут', () => {
    const renderSpy = sinon.spy(route, 'render');

    route.navigate(path);

    expect(renderSpy.calledOnce).to.be.true;
  });
});
