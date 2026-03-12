import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { Idea } from '../../models/idea.model';
import { EditDraftModalComponent } from '../edit-draft-modal/edit-draft-modal.component';

const MAX_DRAFTS = 5;

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [CommonModule, EditDraftModalComponent],
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent {
  svc    = inject(IdeaService);
  auth   = inject(AuthService);
  router = inject(Router);

  publishing  = signal<string | null>(null);
  deleting    = signal<string | null>(null);
  editingDraft = signal<Idea | null>(null);
  maxDrafts   = MAX_DRAFTS;

  async publish(draft: Idea): Promise<void> {
    this.publishing.set(draft.id);
    try { await this.svc.publishDraft(draft); } finally { this.publishing.set(null); }
  }

  delete(id: string): void {
    this.deleting.set(id);
    setTimeout(() => { this.svc.deleteDraft(id); this.deleting.set(null); }, 300);
  }

  openEdit(draft: Idea): void { this.editingDraft.set(draft); }
  closeEdit(): void           { this.editingDraft.set(null); }

  newIdea(): void { this.router.navigate(['/']); }
}
