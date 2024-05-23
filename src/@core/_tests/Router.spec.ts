import { describe, it } from 'mocha';
import { IProps } from '@models/common';
import { expect } from 'chai';
import sinon from 'sinon';
import Router from '../Router';
import Block from '../Block';

const canActivate = async (path: string): Promise<boolean> => true;

describe('Router', () => {
  let router: Router;
  let PageClass!: typeof Block<IProps>;

  before(() => {
    class MockPage extends Block {}
    PageClass = MockPage;

    router = new Router('main#app', canActivate);
  });

  it('должен регистрировать указанный маршрут', () => {
    const path = '/test';

    router.use(path, PageClass);

    expect(router.routes.length).to.be.eq(1);
  });

  it('должен возвращать объект Route по зарегистрированному маршруту', () => {
    const path = '/test';

    const route = router.getRoute(path);

    expect(route).to.be.not.undefined;
  });

  it('должен осуществлять переход по указанному маршруту', () => {
    const path = '/test';
    const historyStub = sinon.stub(router.history, 'pushState');

    router.go(path);

    expect(historyStub.args[0][2]).to.be.eq(path);
    historyStub.restore();
  });

  it('должен осуществлять переход назад в history', () => {
    const historyStub = sinon.stub(router.history, 'back');

    router.back();

    expect(historyStub.called).to.be.true;
    historyStub.restore();
  });

  it('должен осуществлять переход вперед в history', () => {
    const historyStub = sinon.stub(router.history, 'forward');

    router.forward();

    expect(historyStub.called).to.be.true;
    historyStub.restore();
  });
});

describe.skip('Route', () => {});
