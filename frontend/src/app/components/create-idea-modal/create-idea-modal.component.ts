import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-idea-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-idea-modal.component.html',
  styleUrls: ['./create-idea-modal.component.scss']
})
export class CreateIdeaModalComponent {
  @Output() close = new EventEmitter<void>();

  private svc  = inject(IdeaService);
  private auth = inject(AuthService);

  form     = { title: '', description: '', tags: [] as string[] };
  tagInput = '';
  saving   = false;

  get currentUser() { return this.auth.currentUser(); }

  isValid(): boolean { return !!(this.form.title.trim() && this.form.description.trim()); }

  onTagKeydown(e: KeyboardEvent): void {
    if ((e.key === 'Enter' || e.key === ',') && this.tagInput.trim()) {
      e.preventDefault();
      const tag = this.tagInput.trim().replace(',', '');
      if (tag && !this.form.tags.includes(tag)) this.form.tags = [...this.form.tags, tag];
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void { this.form.tags = this.form.tags.filter(t => t !== tag); }

  async submit(): Promise<void> {
    if (!this.isValid() || !this.currentUser || this.saving) return;
    this.saving = true;
    try {
      await this.svc.createIdea({
        title:       this.form.title,
        description: this.form.description,
        author:      this.currentUser.name,
        authorId:    this.currentUser.id,
        avatar:      this.currentUser.avatar,
        avatarColor: this.currentUser.avatarColor,
        tags:        this.form.tags
      });
      this.close.emit();
    } finally {
      this.saving = false;
    }
  }

  onOverlayClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.close.emit();
  }
}
