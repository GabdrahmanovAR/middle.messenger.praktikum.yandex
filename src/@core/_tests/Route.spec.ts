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

  afterEach(() => {
    sinon.restore();
  });

  it('должен удалять элемент из dom дерева после вызова метода clear', () => {
    route.navigate(path);
    const elementBeforeClear = document.querySelector('#route-test');
    const attrBeforeClear = (elementBeforeClear as HTMLDivElement).getAttribute('id');

    route.clear();
    const elementAfterClear = document.querySelector('#route-test');
    const attrAfterClear = (elementAfterClear as HTMLDivElement)?.getAttribute('id') ?? '';

    expect(attrBeforeClear).to.be.eq('route-test');
    expect(attrAfterClear).to.be.eq('');
  });

  it('должен скрыть компонент после вызова метода leave', () => {
    const clock = sinon.useFakeTimers();
    route.render();
    clock.next();
    route.leave();

    const element = document.querySelector('#route-test');
    const displayValue = (element as HTMLDivElement).style.display;
    expect(displayValue).to.be.eq('none');
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
