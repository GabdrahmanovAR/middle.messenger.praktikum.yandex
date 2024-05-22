import { describe, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import Block from './Block';
import { IProps } from '../@models/common';

interface IMockPage extends IProps {
  text?: string;
}

describe('Модуль Block', () => {
  let PageClass!: typeof Block<IMockPage>;

  before(() => {
    class MockPage extends Block<IMockPage> {
      constructor(props: IMockPage) {
        super({ ...props });
      }

      protected render(): string {
        return `
          <div>
            <span id="mock-page">{{ text }}</span>
          </div>
        `;
      }
    }
    PageClass = MockPage;
  });

  describe('Создание компонента', () => {
    it('должен создать компонент с указанными в constructor параметрами', () => {
      const text = 'Hello';
      const pageComponent = new PageClass({ text });

      const componentText = pageComponent.element?.querySelector('#mock-page')?.innerHTML;

      expect(componentText).to.be.eq(text);
    });

    it('должен вызвать метод componentDidMount при монтировании компонента в dom дерево', () => {
      const pageComponent = new PageClass({});
      const clock = sinon.useFakeTimers();
      const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

      const element = pageComponent.getContent();

      if (element) {
        document.body.append(element);
        clock.next();

        expect(spyCDM.calledOnce).to.be.true;
      }
    });

    it('должен установить событие клика на компонент', () => {
      const stubFunc = sinon.stub();
      const pageComponent = new PageClass({
        events: {
          click: stubFunc,
        },
      });

      const click = new MouseEvent('click');
      pageComponent.element?.dispatchEvent(click);

      expect(stubFunc.calledOnce).to.be.true;
    });
  });

  describe('Обновление компонента', () => {
    it('должен обновить свойства компонента переданные в setProps', () => {
      const text = 'Hello';
      const updatedText = 'World';
      const pageComponent = new PageClass({ text });
      pageComponent.setProps({ text: updatedText });

      const componentText = pageComponent.element?.querySelector('#mock-page')?.innerHTML;

      expect(componentText).to.be.eq(updatedText);
    });
  });
});
