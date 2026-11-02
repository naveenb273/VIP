import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-copy-link-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './copy-link-modal.component.html',
  styleUrls: ['./copy-link-modal.component.scss']
})
export class CopyLinkModalComponent {
  @Input() heading = 'Share idea';
  @Input({ required: true }) link = '';

  @Output() close = new EventEmitter<void>();
  @Output() copied = new EventEmitter<void>();

  copiedMessage = false;

  async copyLink(): Promise<void> {
    if (!this.link) {
      return;
    }

    const copied = await this.tryClipboardWrite(this.link);
    if (!copied) {
      return;
    }

    this.copied.emit();
    this.copiedMessage = true;
    this.close.emit();
    setTimeout(() => {
      this.copiedMessage = false;
    }, 3000);
  }

  private async tryClipboardWrite(value: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }

      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch {
      return false;
    }
  }
}
