import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IDropDownList, IDropdownListProps } from '../../@models/components';
import isEqual from '../../utils/isEqual';

export default class DropdownList extends Block<IDropdownListProps> {
  private onElementClickBind!: (event: MouseEvent) => void;

  constructor(props: IDropdownListProps) {
    super({
      ...props,
      onMenuItemSelect: (attr: string) => {
        props.list.forEach((listItem: IDropDownList) => {
          if (listItem.name === attr && listItem.onClick) {
            listItem.onClick();
          }
        });
      },
    });
  }

  public showList(container: string, indent?: number): void {
    this.onElementClickBind = this.onElementClick.bind(this);
    this.calculateDropDownPosition(container, indent);

    setTimeout(() => {
      document.addEventListener('click', this.onElementClickBind);
    });
  }

  public hideList(): void {
    document.removeEventListener('click', this.onElementClickBind);
    this.setProps({ visible: false });
  }

  private onElementClick(event: MouseEvent): void {
    const target = event.target instanceof HTMLElement && event.target;
    if (!target) {
      return;
    }

    if (!this.element?.contains(target) && target.tagName !== 'INPUT') {
      this.hideList();
    }
    if (target.tagName === 'INPUT') {
      return;
    }
    const attribute = event.target.getAttribute('name');
    if (attribute) {
      this.onMenuItemClick(attribute);
      this.setProps({ visible: false });
    }
  }

  private onMenuItemClick(attr: string): void {
    this.props.list.forEach((listItem: IDropDownList) => {
      if (listItem.name === attr && listItem.onClick) {
        listItem.onClick();
      }
    });
  }

  private calculateDropDownPosition(containerId: string, indent = 24): void {
    const component = this.props.appednTo;
    const dropdown = this.element;
    // const container = containerId ? document.getElementById(containerId) : document.getElementById('chatContent');
    const container = document.getElementById(containerId);

    if (component && dropdown && container) {
      const componentRect = component.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let offsetTop: number | null = componentRect.bottom + indent;
      let offsetBottom: number | null = window.innerHeight - componentRect.top + indent;
      let offsetLeft: number | null = componentRect.left;
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

  public componentDidUpdate(_oldProps: IDropdownListProps, _newProps: IDropdownListProps): boolean {
    const prevList = _oldProps.list;
    const nextList = _newProps.list;

    if (!isEqual(prevList, nextList)) {
      this.setProps({ list: nextList });
    }
    return true;
  }

  protected render(): string {
    return `
    <div class="dropdown{{#if visible}} dropdown_visible{{/if}}" style="${this.positionStyle()}">
      ${this.props.list.map((list: IDropDownList) => `
        <div name="${list.name}" class="dropdown__item">
          ${list.icon ? `
            <div class="dropdown__item-icon">
              <img src="${list.icon}" alt="Dropdown list item icon">
            </div>
          ` : ''}
          <span class="dropdown__item-name ${!list.icon ? 'pl-0' : 'pl-1'}">
            ${list.title}
          </span>
        </div>
      `).join('')}
    </div>
    `;
  }
}
