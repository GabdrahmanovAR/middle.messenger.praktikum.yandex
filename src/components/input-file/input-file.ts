import Block from '../../@core/Block';
import { DefaultAppState } from '../../@models/common';
import { IInputFile } from '../../@models/components';
import { readFile } from '../../services/file.service';
import { connect } from '../../utils/connect';
import { Input } from '../input';
import InputFileTemplate from './input-file.template';

class InputFile extends Block<IInputFile> {
  protected init(): void {
    const onAvatarChangeBind = this.props.onClick?.bind(this);
    const onChooseFileBind = this.onChooseFile.bind(this);

    const AvatarComponent = new Input({
      type: 'button',
      id: 'button-upload',
      name: 'modal-avatar',
      onClick: onAvatarChangeBind,
    });
    const InputFileComponent = new Input({
      type: 'file',
      id: 'file-upload',
      accept: this.props.acceptType,
      name: 'choose-file',
      onChange: onChooseFileBind,
    });

    this.children = {
      ...this.children,
      AvatarComponent,
      InputFileComponent,
    };
  }

  private onChooseFile(event: Event): void {
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files && inputFile.files[0];

    if (file) {
      // TODO нужно ли считывать текущий файл и обновлять аватар, даже если запрос был с ошибкой
      // readFile(file);
      this.setProps({ fileName: file.name, file });
    }
  }

  protected render(): string {
    return InputFileTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ avatar: state.avatar });

export default connect(mapStateToProps)(InputFile);
