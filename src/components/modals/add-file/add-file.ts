import { EMPTY_STRING } from '../../../../assets/constants/common';
import Block from '../../../@core/Block';
import { IInputFile, IModalAddFileProps } from '../../../@models/components';
import { Button } from '../../button';
import { InputFile } from '../../input-file';
import ModalProfileTemplate from './add-file.template';

export default class AddFile extends Block<IModalAddFileProps> {
  constructor(props: IModalAddFileProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const classNames = (event.target as HTMLElement).className;
          if (classNames.includes('modal-container')) {
            this.setProps({ visible: false, error: false });
          }
        },
      },
    });
  }

  protected init(): void {
    const changeAvatarBind = this.changeAvatar.bind(this);
    const InputComponent = new InputFile({
      label: 'Выберите файл на компьютере',
      acceptType: 'image/*',
    });
    const ButtonSubmit = new Button({
      type: 'submit',
      label: 'Поменять',
      isRectangle: true,
      onClick: changeAvatarBind,
    });

    this.children = {
      ...this.children,
      InputComponent,
      ButtonSubmit,
    };
  }

  private async changeAvatar(event: Event): Promise<void> {
    event.preventDefault();
    const input = this.children.InputComponent instanceof InputFile ? this.children.InputComponent : undefined;
    const file = input && (input.props as IInputFile)?.file;

    if (this.props.onChoose && file) {
      this.props.onChoose(file);
      input.setProps({ fileName: EMPTY_STRING, file: undefined });
      this.setProps({ visible: false, error: false });
    } else {
      this.setProps({ error: true });
    }
  }

  protected render(): string {
    return ModalProfileTemplate;
  }
}
