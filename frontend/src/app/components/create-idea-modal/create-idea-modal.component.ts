import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { CoverPositionerComponent } from '../cover-positioner/cover-positioner.component';

@Component({
  selector: 'app-create-idea-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CoverPositionerComponent],
  templateUrl: './create-idea-modal.component.html',
  styleUrls: ['./create-idea-modal.component.scss']
})
export class CreateIdeaModalComponent {
  @Output() close = new EventEmitter<void>();

  private svc    = inject(IdeaService);
  private auth   = inject(AuthService);
  private router = inject(Router);

  form = {
    title: '', description: '', tags: [] as string[],
    coverImage: '', coverPosition: '50% 50%'
  };
  tagInput    = '';
  saving      = false;
  drafting    = false;
  coverPreview = '';

  get currentUser() { return this.auth.currentUser(); }
  get draftCount()  { return this.svc.drafts().length; }

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

  onCoverSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.form.coverImage = reader.result as string;
      this.coverPreview    = reader.result as string;
      this.form.coverPosition = '50% 50%';
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  removeCover(): void {
    this.form.coverImage = '';
    this.coverPreview = '';
    this.form.coverPosition = '50% 50%';
  }

  async post(): Promise<void> {
    if (!this.isValid() || !this.currentUser || this.saving) return;
    this.saving = true;
    try {
      await this.svc.createIdea({
        title: this.form.title, description: this.form.description,
        author: this.currentUser.name, authorId: this.currentUser.id,
        avatar: this.currentUser.avatar, avatarColor: this.currentUser.avatarColor,
        tags: this.form.tags,
        coverImage: this.form.coverImage,
        coverPosition: this.form.coverPosition
      });
      this.close.emit();
    } finally { this.saving = false; }
  }

  saveDraft(): void {
    if (!this.currentUser) return;
    this.drafting = true;
    this.svc.saveDraft({
      title: this.form.title || 'Untitled Draft',
      description: this.form.description,
      author: this.currentUser.name, authorId: this.currentUser.id,
      avatar: this.currentUser.avatar, avatarColor: this.currentUser.avatarColor,
      tags: this.form.tags,
      coverImage: this.form.coverImage,
      coverPosition: this.form.coverPosition
    });
    setTimeout(() => { this.drafting = false; this.close.emit(); this.router.navigate(['/drafts']); }, 600);
  }

  onOverlayClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.close.emit();
  }
}
