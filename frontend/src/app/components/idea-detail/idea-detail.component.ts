import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { CollaborationPanelComponent } from '../collaboration/collaboration-panel.component';
import { EditIdeaModalComponent } from '../edit-idea-modal/edit-idea-modal.component';

@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CollaborationPanelComponent, EditIdeaModalComponent],
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.scss']
})
export class IdeaDetailComponent implements OnInit {
  svc          = inject(IdeaService);
  auth         = inject(AuthService);
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  private ideaId = signal<string | null>(null);

  currentIdea = computed(() => {
    this.svc.ideas(); // track signal
    const id = this.ideaId();
    return id ? this.svc.getById(id) : undefined;
  });

  isOwner = computed(() => {
    const idea = this.currentIdea();
    return idea ? this.auth.isOwner(idea.authorId) : false;
  });

  /** True if the current user is the owner OR listed as a collaborator on this idea */
  isOwnerOrCollaborator = computed(() => {
    const idea = this.currentIdea();
    const user = this.auth.currentUser();
    if (!idea || !user) return false;
    return idea.collaborators.some(c =>
      c.name === user.name || c.email === user.email
    );
  });

  /** URL-encoded search query for VGPatent based on idea title + tags */
  patentSearchQuery = computed(() => {
    const idea = this.currentIdea();
    if (!idea) return '';
    const terms = [idea.title, ...idea.tags].join(' ');
    return encodeURIComponent(terms);
  });

  hasRequested = computed(() => {
    const idea = this.currentIdea();
    const user = this.auth.currentUser();
    if (!idea || !user) return false;
    return idea.collaborationRequests.some(r => r.requesterId === user.id);
  });

  newComment  = '';
  shareFlash  = false;
  showEdit    = false;
  collabMsg   = '';
  uploadError = '';

  ngOnInit(): void {
    this.ideaId.set(this.route.snapshot.paramMap.get('id'));
  }

  goBack(): void { this.router.navigate(['/']); }

  async onShare(): Promise<void> {
    const id = this.currentIdea()?.id;
    if (!id) return;
    this.shareFlash = true;
    await this.svc.incrementShare(id);
    setTimeout(() => this.shareFlash = false, 800);
  }

  async postComment(): Promise<void> {
    const t    = this.newComment.trim();
    const id   = this.currentIdea()?.id;
    const user = this.auth.currentUser();
    if (!t || !id || !user) return;
    await this.svc.addComment(id, t, user.name, user.avatar, user.avatarColor);
    this.newComment = '';
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) this.postComment();
  }

  // ── Attachments ────────────────────────────────────────────────────────────
  onFileSelected(e: Event): void {
    const input  = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const user   = this.auth.currentUser();
    const ideaId = this.currentIdea()?.id;
    if (!user || !ideaId) return;
    this.uploadError = '';

    Array.from(input.files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        this.uploadError = `"${file.name}" exceeds 5 MB limit.`;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.svc.addAttachment(ideaId, {
          name: file.name, size: file.size, type: file.type,
          dataUrl:      reader.result as string,
          uploadedBy:   user.name,
          uploadedDate: new Date().toISOString().slice(0, 10)
        });
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  async removeAttachment(attachmentId: string): Promise<void> {
    const id = this.currentIdea()?.id;
    if (id) await this.svc.removeAttachment(id, attachmentId);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024)            return bytes + ' B';
    if (bytes < 1024 * 1024)     return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  isImage(type: string): boolean { return type.startsWith('image/'); }

  // ── Collaboration request ──────────────────────────────────────────────────
  async sendCollabRequest(): Promise<void> {
    const idea = this.currentIdea();
    const user = this.auth.currentUser();
    if (!idea || !user || !this.collabMsg.trim()) return;
    await this.svc.sendCollaborationRequest(idea.id, {
      requesterId:          user.id,
      requesterName:        user.name,
      requesterAvatar:      user.avatar,
      requesterAvatarColor: user.avatarColor,
      message:              this.collabMsg.trim()
    });
    this.collabMsg = '';
  }
}
