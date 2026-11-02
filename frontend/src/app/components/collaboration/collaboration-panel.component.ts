import { Component, Input, Output, EventEmitter, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { Idea, Collaborator, AzureUser } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-collaboration-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './collaboration-panel.component.html',
  styleUrls: ['./collaboration-panel.component.scss']
})
export class CollaborationPanelComponent implements OnChanges {
  @Input({ required: true }) idea!: Idea;
  @Input() isOwner     = false;
  @Input() currentUser: AzureUser | null = null;
  @Input() hasRequested = false;
  @Input() collabMsg    = '';
  @Output() collabMsgChange = new EventEmitter<string>();
  @Output() sendRequest     = new EventEmitter<void>();

  svc    = inject(IdeaService);
  auth   = inject(AuthService);
  notifs = inject(NotificationService);

  activeTab: 'team' | 'requests' | 'notes' | 'connect' = 'team';
  showAddForm = false;
  newNoteText = '';
  newCollab   = { name: '', email: '', role: 'Contributor' as 'Contributor' | 'Reviewer' };

  get pendingRequests() { return this.idea.content.collaborationRequests.filter(r => r.status === 'pending'); }
  get pinnedNotes()     { return this.idea.content.collaborationNotes.filter(n => n.pinned); }
  get unpinnedNotes()   { return this.idea.content.collaborationNotes.filter(n => !n.pinned); }

  get isCollaborator(): boolean {
    const user = this.currentUser;
    if (!user) {
      return false;
    }

    const userEmail = user.email.toLowerCase();
    return this.idea.collaboratorInformation.members.some(member =>
      member.email.toLowerCase() === userEmail || member.id === userEmail || (!!member.objectId && member.objectId === user.id)
    );
  }

  get canAccessNotes(): boolean {
    return this.isOwner || this.isCollaborator || this.isAdminViewer;
  }

  get canAccessConnect(): boolean {
    return this.isOwner || this.isCollaborator || this.isAdminViewer;
  }

  get isAdminViewer(): boolean {
    return this.auth.isAdmin();
  }

  get isAdminOnlyAccess(): boolean {
    return this.isAdminViewer && !this.isOwner && !this.isCollaborator;
  }

  ngOnChanges(): void {
    if (!this.canAccessNotes && this.activeTab === 'notes') {
      this.activeTab = 'team';
    }
    if (!this.canAccessConnect && this.activeTab === 'connect') {
      this.activeTab = 'team';
    }
  }

  // ── Team ───────────────────────────────────────────────────────────────────
  async submitCollaborator(): Promise<void> {
    if (!this.newCollab.name.trim()) return;
    const initials = this.newCollab.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const colors   = ['#141414','#575757','#87754e','#146ad1','#009bbe','#00820d','#ae9871'];
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
    const subject   = encodeURIComponent(`[VIP] You've been added as a collaborator — "${this.idea.ideaInformation.title}"`);
    const body      = encodeURIComponent(
      `Hi ${name},\n\n` +
      `${ownerName} has added you as a ${role} on the following idea in VIP:\n\n` +
      `Idea: ${this.idea.ideaInformation.title}\n` +
      `Role: ${role}\n\n` +
      `About this idea:\n${this.idea.ideaInformation.description}\n\n` +
      `Tags: ${this.idea.ideaInformation.tags.join(', ')}\n\n` +
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
    const req = this.idea.content.collaborationRequests.find(r => r.id === reqId);
    await this.svc.respondToRequest(this.idea.id, reqId, status);

    if (req) {
      // In-app notification (will be seen by requester if on this device)
      this.notifs.add({
        type: status === 'accepted' ? 'collab_accepted' : 'collab_declined',
        title: status === 'accepted' ? 'Collaboration Accepted!' : 'Collaboration Declined',
        message: status === 'accepted'
          ? `Your request to collaborate on "${this.idea.ideaInformation.title}" was accepted`
          : `Your request to collaborate on "${this.idea.ideaInformation.title}" was declined`,
        ideaId: this.idea.id, ideaTitle: this.idea.ideaInformation.title,
        fromUser: this.currentUser?.name, fromAvatar: req.requesterAvatar, fromAvatarColor: req.requesterAvatarColor
      });
      // Email notification to the requester
      this.sendRequestResponseEmail(req.requesterName, status, this.idea.ideaInformation.title);
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
    return `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(c.email)}&message=${encodeURIComponent('Hey! Wanted to discuss the idea: ' + this.idea.ideaInformation.title)}`;
  }

  getOutlookLink(c: Collaborator): string {
    const subject = encodeURIComponent(`[VIP] ${this.idea.ideaInformation.title}`);
    const body    = encodeURIComponent(`Hi ${c.name},\n\nI'd like to collaborate on: "${this.idea.ideaInformation.title}".\n\n${this.idea.ideaInformation.description}\n\nLooking forward to your thoughts!`);
    return `mailto:${c.email ?? ''}?subject=${subject}&body=${body}`;
  }

  getTeamsShareLink(): string {
    const msg = encodeURIComponent(`Check out this idea on VIP: "${this.idea.ideaInformation.title}" — ${this.idea.ideaInformation.description.slice(0, 120)}...`);
    const emails = [...new Set(
      this.idea.collaboratorInformation.members
        .map(c => c.email?.trim().toLowerCase())
        .filter((email): email is string => !!email)
    )];

    if (emails.length === 0) {
      return `https://teams.microsoft.com/l/chat/0/0?message=${msg}`;
    }

    // Teams only honours topicName once the chat has 3+ participants (a group chat).
    const users = emails.map(encodeURIComponent).join(',');
    const topicName = encodeURIComponent(`VIP · ${this.idea.ideaInformation.title}`);
    return `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${msg}`;
  }

  getOutlookShareLink(): string {
    const subject = encodeURIComponent(`[VIP] ${this.idea.ideaInformation.title}`);
    const body    = encodeURIComponent(`Hi,\n\nSharing an idea:\n\nTitle: ${this.idea.ideaInformation.title}\n\n${this.idea.ideaInformation.description}\n\nTags: ${this.idea.ideaInformation.tags.join(', ')}`);
    return `mailto:?subject=${subject}&body=${body}`;
  }

  getTeamEmailLink(): string {
    const emails  = this.idea.collaboratorInformation.members.filter(c => c.email).map(c => c.email).join(';');
    const subject = encodeURIComponent(`[VIP] Team Update: ${this.idea.ideaInformation.title}`);
    const body    = encodeURIComponent(`Hi Team,\n\nUpdate on: ${this.idea.ideaInformation.title}\nCollaborators: ${this.idea.collaboratorInformation.members.map(c => c.name).join(', ')}\n\n${this.idea.ideaInformation.description}`);
    return `mailto:${emails}?subject=${subject}&body=${body}`;
  }
}
