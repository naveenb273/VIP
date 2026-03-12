import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { Idea } from '../../models/idea.model';
import { CoverPositionerComponent } from '../cover-positioner/cover-positioner.component';

@Component({
  selector: 'app-edit-draft-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CoverPositionerComponent],
  templateUrl: './edit-draft-modal.component.html',
  styleUrls: ['./edit-draft-modal.component.scss']
})
export class EditDraftModalComponent implements OnInit {
  @Input({ required: true }) draft!: Idea;
  @Output() close = new EventEmitter<void>();

  private svc  = inject(IdeaService);
  private auth = inject(AuthService);

  form = {
    title: '', description: '', tags: [] as string[],
    coverImage: '', coverPosition: '50% 50%'
  };
  tagInput     = '';
  coverPreview = '';
  saving       = false;
  drafting     = false;

  get currentUser() { return this.auth.currentUser(); }

  ngOnInit(): void {
    this.form = {
      title:         this.draft.title === 'Untitled Draft' ? '' : this.draft.title,
      description:   this.draft.description,
      tags:          [...this.draft.tags],
      coverImage:    this.draft.coverImage    ?? '',
      coverPosition: this.draft.coverPosition ?? '50% 50%'
    };
    this.coverPreview = this.draft.coverImage ?? '';
  }

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
      this.form.coverImage    = reader.result as string;
      this.coverPreview       = reader.result as string;
      this.form.coverPosition = '50% 50%';
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  removeCover(): void {
    this.form.coverImage    = '';
    this.coverPreview       = '';
    this.form.coverPosition = '50% 50%';
  }

  saveDraft(): void {
    if (!this.currentUser) return;
    this.drafting = true;
    this.svc.saveDraft({
      id:            this.draft.id,
      title:         this.form.title || 'Untitled Draft',
      description:   this.form.description,
      author:        this.draft.author,
      authorId:      this.draft.authorId,
      avatar:        this.draft.avatar,
      avatarColor:   this.draft.avatarColor,
      tags:          this.form.tags,
      coverImage:    this.form.coverImage,
      coverPosition: this.form.coverPosition
    });
    setTimeout(() => { this.drafting = false; this.close.emit(); }, 400);
  }

  async post(): Promise<void> {
    if (!this.isValid() || !this.currentUser || this.saving) return;
    this.saving = true;
    try {
      this.svc.saveDraft({
        id:            this.draft.id,
        title:         this.form.title,
        description:   this.form.description,
        author:        this.draft.author,
        authorId:      this.draft.authorId,
        avatar:        this.draft.avatar,
        avatarColor:   this.draft.avatarColor,
        tags:          this.form.tags,
        coverImage:    this.form.coverImage,
        coverPosition: this.form.coverPosition
      });
      const updated = this.svc.drafts().find(d => d.id === this.draft.id);
      if (updated) await this.svc.publishDraft(updated);
      this.close.emit();
    } finally { this.saving = false; }
  }

  onOverlayClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.close.emit();
  }
}
