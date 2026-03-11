import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Idea } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-edit-idea-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-idea-modal.component.html',
  styleUrls: ['./edit-idea-modal.component.scss']
})
export class EditIdeaModalComponent implements OnInit {
  @Input({ required: true }) idea!: Idea;
  @Output() close = new EventEmitter<void>();

  private svc = inject(IdeaService);

  form     = { title: '', description: '', tags: [] as string[] };
  tagInput = '';
  saving   = false;

  ngOnInit(): void {
    this.form = { title: this.idea.title, description: this.idea.description, tags: [...this.idea.tags] };
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

  async submit(): Promise<void> {
    if (!this.isValid() || this.saving) return;
    this.saving = true;
    try {
      await this.svc.editIdea(this.idea.id, {
        title: this.form.title, description: this.form.description, tags: this.form.tags
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
