import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IDropDownList } from './dropdown-list.const';

interface IDropdownListProps {
  list: IDropDownList[];
  appednTo: HTMLElement | null;
  visible?: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export default class DropdownList extends Block<IDropdownListProps> {
  private onOuterClickBind!: (event: MouseEvent) => void;

  public show(): void {
    this.onOuterClickBind = this.onOuterClick.bind(this);
    this.calculateDropDownPosition();

    setTimeout(() => {
      document.addEventListener('click', this.onOuterClickBind);
    });
  }

  private onOuterClick(event: MouseEvent): void {
    if (!this.element?.contains(event.target as Node)) {
      document.removeEventListener('click', this.onOuterClickBind);
      this.setProps({ visible: false });
    }
  }

  private calculateDropDownPosition(): void {
    const component = this.props.appednTo;
    const dropdown = this.element;
    const container = document.getElementById('chatContent');
    const indent = 24;

    if (component && dropdown && container) {
      const componentRect = component.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let offsetTop: number | null = componentRect.bottom + indent;
      let offsetBottom: number | null = window.innerHeight - componentRect.top + indent;
      let offsetLeft: number | null = componentRect.left - (window.innerWidth - containerRect.width);
      let offsetRight: number | null = containerRect.right - componentRect.right;

      if (offsetTop + dropdownRect.height > window.innerHeight) {
        offsetTop = null;
      } else {
        offsetBottom = null;
      }
      if (offsetLeft + dropdownRect.width > containerRect.width) {
        offsetLeft = null;
      } else {
        offsetRight = null;
      }

      this.setProps({
        top: offsetTop,
        bottom: offsetBottom,
        left: offsetLeft,
        right: offsetRight,
        visible: true,
      });
    }
  }

  private positionStyle(): string {
    const {
      top, bottom, left, right,
    } = this.props;

    let style = EMPTY_STRING;

    if (top) {
      style += `top:${top}px;`;
    }
    if (bottom) {
      style += `bottom:${bottom}px;`;
    }
    if (left) {
      style += `left:${left}px;`;
    }
    if (right) {
      style += `right:${right}px;`;
    }

    return style;
  }

  protected render(): string {
    return `
    <div class="dropdown{{#if visible}} dropdown_visible{{/if}}" style="${this.positionStyle()}">
      ${this.props.list.map((list: IDropDownList) => `
        <div class="dropdown__item">
          <div class="dropdown__item-icon">
            <img src="${list.icon}" alt="Dropdown list item icon">
          </div>
          <span class="dropdown__item-name">
            ${list.name}
          </span>
        </div>
      `).join('')}
    </div>
    `;
  }
}
