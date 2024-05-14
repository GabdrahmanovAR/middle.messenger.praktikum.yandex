import Block from '../../@core/Block';
import { IInputFile } from '../../@models/components';
import { DefaultAppState } from '../../@models/store';
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
      this.setProps({ fileName: file.name, file });
    }
  }

  protected render(): string {
    return InputFileTemplate;
  }
}

const mapStateToProps = (state: DefaultAppState): Partial<DefaultAppState> => ({ avatar: state.avatar });

export default connect(mapStateToProps)(InputFile);
