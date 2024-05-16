import { EMPTY_STRING } from '../../../assets/constants/common';
import Block from '../../@core/Block';
import { IDropDownList, IDropdownListProps } from '../../@models/components';

export default class DropdownList extends Block<IDropdownListProps> {
  private onElementClickBind!: (event: MouseEvent) => void;

  constructor(props: IDropdownListProps) {
    super({
      ...props,
      onMenuItemSelect: (attr: string) => {
        props.list.forEach((listItem: IDropDownList) => {
          if (listItem.name === attr && listItem.onClick) {
            console.log('CLICK !!!!!!!');
            listItem.onClick();
          }
        });
      },
    });
  }

  public showList(container: string): void {
    this.onElementClickBind = this.onElementClick.bind(this);
    this.calculateDropDownPosition(container);

    setTimeout(() => {
      document.addEventListener('click', this.onElementClickBind);
    });
  }

  public hideList(): void {
    document.removeEventListener('click', this.onElementClickBind);
    this.setProps({ visible: false });
  }

  private onElementClick(event: MouseEvent): void {
    // TODO возможно нужно добавить props который будет содержать элемент/ы? для исключения срабатывания
    // закрытия dropdown, например, когда кликаешь на инпут, чтобы ввести новое значение сейчас dropdown закрывается
    if (!this.element?.contains(event.target as Node)) {
      this.hideList();
    }
    if (!(event.target instanceof HTMLElement)) {
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

  private calculateDropDownPosition(containerId: string): void {
    console.log(this.props.appednTo);
    const component = this.props.appednTo;
    const dropdown = this.element;
    // const container = containerId ? document.getElementById(containerId) : document.getElementById('chatContent');
    const container = document.getElementById(containerId);
    const indent = 24;

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
