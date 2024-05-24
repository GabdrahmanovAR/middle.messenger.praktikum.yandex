import { describe, it } from 'mocha';
import { IProps } from '@models/common';
import { expect } from 'chai';
import sinon from 'sinon';
import Router from '../Router';
import Block from '../Block';

describe('Router', () => {
  let router: Router;
  let PageClass!: typeof Block<IProps>;
  let canActivateStub: sinon.SinonStub<any[], Promise<boolean>>;
  const path = '/test';

  before(() => {
    class MockPage extends Block {}
    PageClass = MockPage;

    canActivateStub = sinon.stub().returns(Promise.resolve(true));
    router = new Router('main#app', canActivateStub);
  });

  it('должен регистрировать указанный маршрут', () => {
    router.use(path, PageClass);

    expect(router.routes.length).to.be.eq(1);
  });

  it('должен возвращать объект Route по зарегистрированному маршруту', () => {
    const route = router.getRoute(path);

    expect(route).to.be.not.undefined;
  });

  it('должен очищать дом дерево при вызове метода reset', () => {
    const routeTestStub = sinon.stub(router.routes[0], 'clear');

    router.reset();

    expect(routeTestStub.calledOnce).to.be.true;
  });

  describe('Переходы', () => {
    it('должен проверять маршрут перед переходом', () => {
      const historyStub = sinon.stub(router.history, 'pushState');

      router.go(path);

      expect(canActivateStub.calledOnce).to.be.true;
      historyStub.restore();
    });

    it('должен осуществлять переход по указанному маршруту', () => {
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
});
