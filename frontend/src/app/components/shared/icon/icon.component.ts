import { booleanAttribute, Component, Input, numberAttribute } from '@angular/core';

/** Every file that exists in `src/assets/icons`. */
export type IconName =
  | 'alert-circle'
  | 'arrow-left'
  | 'bell'
  | 'check'
  | 'close'
  | 'code'
  | 'comment'
  | 'copy'
  | 'download-cloud'
  | 'edit'
  | 'external-link'
  | 'file'
  | 'file-text'
  | 'heart'
  | 'heart-filled'
  | 'image'
  | 'list'
  | 'logout'
  | 'mail'
  | 'microsoft'
  | 'moon'
  | 'move'
  | 'paperclip'
  | 'patent'
  | 'plus'
  | 'plus-circle'
  | 'refresh'
  | 'search'
  | 'send'
  | 'share'
  | 'shield'
  | 'spinner'
  | 'star'
  | 'star-filled'
  | 'sun'
  | 'table'
  | 'teams'
  | 'trash'
  | 'upload-cloud'
  | 'user'
  | 'user-plus'
  | 'users';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input({ transform: numberAttribute }) size = 16;
  @Input({ transform: booleanAttribute }) spin = false;
  /** Renders the source file as-is instead of tinting it — for multi-colour icons. */
  @Input({ transform: booleanAttribute }) original = false;
  /** When set, the icon is exposed to screen readers with this label. */
  @Input() label = '';

  get src(): string {
    return `assets/icons/${this.name}.svg`;
  }

  get maskUrl(): string {
    return `url("${this.src}")`;
  }
}
