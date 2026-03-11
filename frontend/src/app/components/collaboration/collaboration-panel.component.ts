import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Idea, Collaborator, AzureUser } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';

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

  svc = inject(IdeaService);

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
    const colors   = ['#f97316','#3b82f6','#14b8a6','#f43f5e','#8b5cf6','#ec4899','#10b981'];
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
    await this.svc.respondToRequest(this.idea.id, reqId, status);
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
