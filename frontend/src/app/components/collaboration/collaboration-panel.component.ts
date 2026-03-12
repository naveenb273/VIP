import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Idea, Collaborator, AzureUser } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-collaboration-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collaboration-panel.component.html',
  styleUrls: ['./collaboration-panel.component.scss']
})
export class CollaborationPanelComponent {
  @Input({ required: true }) idea!: Idea;
  @Input() isOwner     = false;
  @Input() currentUser: AzureUser | null = null;
  @Input() hasRequested = false;
  @Input() collabMsg    = '';
  @Output() collabMsgChange = new EventEmitter<string>();
  @Output() sendRequest     = new EventEmitter<void>();

  svc    = inject(IdeaService);
  notifs = inject(NotificationService);

  activeTab: 'team' | 'requests' | 'notes' | 'connect' = 'team';
  showAddForm = false;
  newNoteText = '';
  newCollab   = { name: '', email: '', role: 'Contributor' as 'Contributor' | 'Reviewer' };

  get pendingRequests() { return this.idea.collaborationRequests.filter(r => r.status === 'pending'); }
  get pinnedNotes()     { return this.idea.collaborationNotes.filter(n => n.pinned); }
  get unpinnedNotes()   { return this.idea.collaborationNotes.filter(n => !n.pinned); }

  // ── Team ───────────────────────────────────────────────────────────────────
  async submitCollaborator(): Promise<void> {
    if (!this.newCollab.name.trim()) return;
    const initials = this.newCollab.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const colors   = ['#003057','#1c4f82','#1a6496','#2e7d8a','#5d4a9c','#8b3a5a','#1a5c3f'];
    const color    = colors[Math.floor(Math.random() * colors.length)];
    await this.svc.addCollaborator(this.idea.id, {
      name: this.newCollab.name.trim(), email: this.newCollab.email.trim(),
      avatar: initials, avatarColor: color, role: this.newCollab.role
    });

    // Send notification email if an address was provided
    if (this.newCollab.email.trim()) {
      this.sendCollaboratorEmail(
        this.newCollab.name.trim(),
        this.newCollab.email.trim(),
        this.newCollab.role
      );
    }

    this.resetForm(); this.showAddForm = false;
  }

  /**
   * Opens a pre-filled Outlook mailto link so the owner can notify
   * the new collaborator. Uses mailto: so no backend mail server is needed —
   * the user's default mail client (Outlook, Gmail, etc.) handles sending.
   */
  private sendCollaboratorEmail(name: string, email: string, role: string): void {
    const ownerName = this.currentUser?.name ?? 'The idea owner';
    const subject   = encodeURIComponent(`[VIP] You've been added as a collaborator — "${this.idea.title}"`);
    const body      = encodeURIComponent(
      `Hi ${name},\n\n` +
      `${ownerName} has added you as a ${role} on the following idea in VIP:\n\n` +
      `Idea: ${this.idea.title}\n` +
      `Role: ${role}\n\n` +
      `About this idea:\n${this.idea.description}\n\n` +
      `Tags: ${this.idea.tags.join(', ')}\n\n` +
      `You can view and collaborate on this idea by opening VIP.\n\n` +
      `Best regards,\n${ownerName}`
    );
    // Open in default mail client — works with Outlook, Gmail in browser, Apple Mail, etc.
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  async removeCollaborator(id: string): Promise<void> {
    await this.svc.removeCollaborator(this.idea.id, id);
  }

  resetForm(): void { this.newCollab = { name: '', email: '', role: 'Contributor' }; }

  // ── Requests ───────────────────────────────────────────────────────────────
  async respondRequest(reqId: string, status: 'accepted' | 'declined'): Promise<void> {
    const req = this.idea.collaborationRequests.find(r => r.id === reqId);
    await this.svc.respondToRequest(this.idea.id, reqId, status);

    if (req) {
      // In-app notification (will be seen by requester if on this device)
      this.notifs.add({
        type: status === 'accepted' ? 'collab_accepted' : 'collab_declined',
        title: status === 'accepted' ? 'Collaboration Accepted!' : 'Collaboration Declined',
        message: status === 'accepted'
          ? `Your request to collaborate on "${this.idea.title}" was accepted`
          : `Your request to collaborate on "${this.idea.title}" was declined`,
        ideaId: this.idea.id, ideaTitle: this.idea.title,
        fromUser: this.currentUser?.name, fromAvatar: req.requesterAvatar, fromAvatarColor: req.requesterAvatarColor
      });
      // Email notification to the requester
      this.sendRequestResponseEmail(req.requesterName, status, this.idea.title);
    }
  }

  private sendRequestResponseEmail(requesterName: string, status: 'accepted' | 'declined', ideaTitle: string): void {
    const ownerName = this.currentUser?.name ?? 'The idea owner';
    const subject   = status === 'accepted'
      ? encodeURIComponent(`[VIP] Your collaboration request was accepted — "${ideaTitle}"`)
      : encodeURIComponent(`[VIP] Update on your collaboration request — "${ideaTitle}"`);
    const body = encodeURIComponent(
      `Hi ${requesterName},\n\n` +
      (status === 'accepted'
        ? `Great news! ${ownerName} has accepted your request to collaborate on "${ideaTitle}". You are now a collaborator on this idea.\n\nOpen VIP to start contributing!`
        : `${ownerName} has reviewed your collaboration request for "${ideaTitle}" and has decided not to accept it at this time.\n\nYou are welcome to explore other ideas on VIP.`) +
      `\n\n— VIP Notification`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }

  // ── Notes ──────────────────────────────────────────────────────────────────
  async submitNote(): Promise<void> {
    if (!this.newNoteText.trim() || !this.currentUser) return;
    await this.svc.addCollaborationNote(
      this.idea.id, this.newNoteText.trim(),
      this.currentUser.name, this.currentUser.avatar, this.currentUser.avatarColor
    );
    this.newNoteText = '';
  }

  async togglePin(noteId: string): Promise<void> {
    await this.svc.togglePinNote(this.idea.id, noteId);
  }

  // ── Deep links ─────────────────────────────────────────────────────────────
  getTeamsLink(c: Collaborator): string {
    if (!c.email) return 'https://teams.microsoft.com/';
    return `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(c.email)}&message=${encodeURIComponent('Hey! Wanted to discuss the idea: ' + this.idea.title)}`;
  }

  getOutlookLink(c: Collaborator): string {
    const subject = encodeURIComponent(`[VIP] ${this.idea.title}`);
    const body    = encodeURIComponent(`Hi ${c.name},\n\nI'd like to collaborate on: "${this.idea.title}".\n\n${this.idea.description}\n\nLooking forward to your thoughts!`);
    return c.email
      ? `mailto:${c.email}?subject=${subject}&body=${body}`
      : `https://outlook.office.com/mail/deeplink/compose?subject=${subject}&body=${body}`;
  }

  getTeamsShareLink(): string {
    const msg = encodeURIComponent(`Check out this idea on VIP: "${this.idea.title}" — ${this.idea.description.slice(0, 120)}...`);
    return `https://teams.microsoft.com/l/chat/0/0?message=${msg}`;
  }

  getOutlookShareLink(): string {
    const subject = encodeURIComponent(`[VIP] ${this.idea.title}`);
    const body    = encodeURIComponent(`Hi,\n\nSharing an idea:\n\nTitle: ${this.idea.title}\n\n${this.idea.description}\n\nTags: ${this.idea.tags.join(', ')}`);
    return `https://outlook.office.com/mail/deeplink/compose?subject=${subject}&body=${body}`;
  }

  getTeamEmailLink(): string {
    const emails  = this.idea.collaborators.filter(c => c.email).map(c => c.email).join(';');
    const subject = encodeURIComponent(`[VIP] Team Update: ${this.idea.title}`);
    const body    = encodeURIComponent(`Hi Team,\n\nUpdate on: ${this.idea.title}\nCollaborators: ${this.idea.collaborators.map(c => c.name).join(', ')}\n\n${this.idea.description}`);
    return emails
      ? `mailto:${emails}?subject=${subject}&body=${body}`
      : `https://outlook.office.com/mail/deeplink/compose?subject=${subject}&body=${body}`;
  }
}
