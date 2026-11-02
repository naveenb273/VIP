import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';
import { Idea } from '../../models/idea.model';

const COVER_EMOJIS = ['🌱','💡','🌿','🔬','♻️','🌍','⚡','🌊','🍃','🔋'];

@Component({
  selector: 'app-idea-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss']
})
export class IdeaCardComponent {
  @Input({ required: true }) idea!: Idea;
  @Input() liked     = false;
  @Input() favorited = false;

  @Output() like      = new EventEmitter<void>();
  @Output() share     = new EventEmitter<void>();
  @Output() favorite  = new EventEmitter<void>();
  @Output() cardClick = new EventEmitter<void>();

  hovered    = false;
  shareFlash = false;

  coverEmoji(): string {
    const idx = this.idea.ideaInformation.title.charCodeAt(0) % COVER_EMOJIS.length;
    return COVER_EMOJIS[idx];
  }

  onShare(): void {
    this.share.emit();
  }
}
