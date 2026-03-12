import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { CollaborationPanelComponent } from '../collaboration/collaboration-panel.component';
import { EditIdeaModalComponent } from '../edit-idea-modal/edit-idea-modal.component';

const COVER_EMOJIS = ['🌱','💡','🌿','🔬','♻️','🌍','⚡','🌊','🍃','🔋'];

@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CollaborationPanelComponent, EditIdeaModalComponent],
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.scss']
})
export class IdeaDetailComponent implements OnInit {
  svc    = inject(IdeaService);
  auth   = inject(AuthService);
  notifs = inject(NotificationService);
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  private ideaId = signal<string | null>(null);

  currentIdea = computed(() => {
    this.svc.ideas();
    const id = this.ideaId();
    return id ? this.svc.getById(id) : undefined;
  });

  isOwner = computed(() => {
    const idea = this.currentIdea();
    return idea ? this.auth.isOwner(idea.authorId) : false;
  });

  isOwnerOrCollaborator = computed(() => {
    const idea = this.currentIdea();
    const user = this.auth.currentUser();
    if (!idea || !user) return false;
    if (this.auth.isOwner(idea.authorId)) return true;
    return idea.collaborators.some(c => c.name === user.name || c.email === user.email);
  });

  patentSearchQuery = computed(() => {
    const idea = this.currentIdea();
    if (!idea) return '';
    return encodeURIComponent([idea.title, ...idea.tags].join(' '));
  });

  hasRequested = computed(() => {
    const idea = this.currentIdea();
    const user = this.auth.currentUser();
    if (!idea || !user) return false;
    return idea.collaborationRequests.some(r => r.requesterId === user.id);
  });

  coverEmoji = computed(() => {
    const idea = this.currentIdea();
    if (!idea) return '🌱';
    return COVER_EMOJIS[idea.title.charCodeAt(0) % COVER_EMOJIS.length];
  });

  newComment  = '';
  shareFlash  = false;
  showEdit    = false;
  collabMsg   = '';
  uploadError = '';

  ngOnInit(): void { this.ideaId.set(this.route.snapshot.paramMap.get('id')); }

  goBack(): void { this.router.navigate(['/']); }

  async onShare(): Promise<void> {
    const id = this.currentIdea()?.id;
    if (!id) return;
    this.shareFlash = true;
    await this.svc.incrementShare(id);
    setTimeout(() => this.shareFlash = false, 800);
  }

  async postComment(): Promise<void> {
    const t = this.newComment.trim(), id = this.currentIdea()?.id, user = this.auth.currentUser();
    if (!t || !id || !user) return;
    await this.svc.addComment(id, t, user.name, user.avatar, user.avatarColor);
    this.newComment = '';
  }

  onKeydown(e: KeyboardEvent): void { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) this.postComment(); }

  onFileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const user = this.auth.currentUser(), ideaId = this.currentIdea()?.id;
    if (!user || !ideaId) return;
    this.uploadError = '';
    Array.from(input.files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) { this.uploadError = `"${file.name}" exceeds 5 MB limit.`; return; }
      const reader = new FileReader();
      reader.onload = () => this.svc.addAttachment(ideaId, {
        name: file.name, size: file.size, type: file.type,
        dataUrl: reader.result as string, uploadedBy: user.name,
        uploadedDate: new Date().toISOString().slice(0, 10)
      });
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  async removeAttachment(id: string): Promise<void> {
    const ideaId = this.currentIdea()?.id;
    if (ideaId) await this.svc.removeAttachment(ideaId, id);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  isImage(type: string): boolean { return type.startsWith('image/'); }

  // ── Collaboration request — mail + notification to owner ──────────────────
  async sendCollabRequest(): Promise<void> {
    const idea = this.currentIdea();
    const user = this.auth.currentUser();
    if (!idea || !user || !this.collabMsg.trim()) return;

    await this.svc.sendCollaborationRequest(idea.id, {
      requesterId: user.id, requesterName: user.name,
      requesterAvatar: user.avatar, requesterAvatarColor: user.avatarColor,
      message: this.collabMsg.trim()
    });

    // In-app notification for the owner (will show to them on this device if shared session or next login)
    this.notifs.add({
      type: 'collab_request',
      title: 'New Collaboration Request',
      message: `${user.name} wants to collaborate on "${idea.title}"`,
      ideaId: idea.id, ideaTitle: idea.title,
      fromUser: user.name, fromAvatar: user.avatar, fromAvatarColor: user.avatarColor
    });

    // Email to owner via mailto — fix: now actually fires for user->owner direction
    this.sendCollabRequestMailToOwner(idea.author, idea.title, idea.description, user.name, this.collabMsg.trim());

    this.collabMsg = '';
  }

  private sendCollabRequestMailToOwner(
    ownerName: string, ideaTitle: string, ideaDesc: string,
    requesterName: string, message: string
  ): void {
    // We don't have the owner's email — construct a helpful message for them to forward
    const subject = encodeURIComponent(`[VIP] Collaboration Request for "${ideaTitle}"`);
    const body    = encodeURIComponent(
      `Hi ${ownerName},\n\n` +
      `${requesterName} has requested to collaborate on your idea in VIP:\n\n` +
      `Idea: "${ideaTitle}"\n` +
      `Message from ${requesterName}:\n"${message}"\n\n` +
      `Idea description:\n${ideaDesc.slice(0, 300)}\n\n` +
      `Please open VIP to review and respond to this request.\n\n` +
      `— VIP Notification`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }
}
