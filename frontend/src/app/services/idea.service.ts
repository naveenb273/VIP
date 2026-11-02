import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import {
  Idea, Comment, Collaborator, CollaborationNote,
  CollaborationRequest, IdeaAttachment
} from '../models/idea.model';

const API = '/api';
const DRAFT_KEY = 'vip-drafts-v1';
const MAX_DRAFTS = 5;

interface ReactionsState { likedIds: string[]; favoritedIds: string[]; }

function uid(): string { return Math.random().toString(36).slice(2, 10); }

const toIso = (value: string | undefined): string => {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
};

@Injectable({ providedIn: 'root' })
export class IdeaService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  ideas        = signal<Idea[]>([]);
  drafts       = signal<Idea[]>(this.loadDrafts());
  likedIds     = signal<Set<string>>(new Set());
  favoritedIds = signal<Set<string>>(new Set());
  loading      = signal(false);
  error        = signal<string | null>(null);

  constructor() { this.loadAll(); }

  // ── Bootstrap ──────────────────────────────────────────────────────────────
  async loadAll(): Promise<void> {
    this.loading.set(true);
    try {
      const userEmail = (this.auth.currentUser()?.email ?? '').toLowerCase();
      const [ideas, reactions] = await Promise.all([
        firstValueFrom(this.http.get<Idea[]>(`${API}/ideas`)),
        firstValueFrom(this.http.get<ReactionsState>(`${API}/reactions`, { params: { userEmail } }))
      ]);
      this.ideas.set(ideas);
      this.likedIds.set(new Set(reactions.likedIds));
      this.favoritedIds.set(new Set(reactions.favoritedIds));
    } catch (e: any) {
      this.error.set('Could not reach the API server. Is the backend running on port 3000?');
      console.error('[IdeaService]', e);
    } finally {
      this.loading.set(false);
    }
  }

  // ── Queries ────────────────────────────────────────────────────────────────
  getById(id: string): Idea | undefined { return this.ideas().find(i => i.id === id); }
  isLiked(id: string):     boolean { return this.likedIds().has(id); }
  isFavorited(id: string): boolean { return this.favoritedIds().has(id); }

  // ── Reactions ──────────────────────────────────────────────────────────────
  async toggleLike(id: string): Promise<void> {
    const userEmail = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const userObjectId = this.auth.currentUser()?.id;
    if (!userEmail) {
      return;
    }

    const res = await firstValueFrom(
      this.http.post<{ liked: boolean; likes: number; likedBy: string[] }>(`${API}/reactions/like/${id}`, { userEmail, userObjectId })
    );
    const liked = new Set(this.likedIds());
    res.liked ? liked.add(id) : liked.delete(id);
    this.likedIds.set(liked);
    this.ideas.update(list => list.map(i => i.id === id ? {
      ...i,
      engagement: { ...i.engagement, likes: res.likes, likedBy: res.likedBy }
    } : i));
  }

  async toggleFavorite(id: string): Promise<void> {
    const userEmail = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const userObjectId = this.auth.currentUser()?.id;
    if (!userEmail) {
      return;
    }

    const res = await firstValueFrom(
      this.http.post<{ favorited: boolean; favoritedBy: string[] }>(`${API}/reactions/favorite/${id}`, {
        userEmail,
        userObjectId
      })
    );
    const fav = new Set(this.favoritedIds());
    res.favorited ? fav.add(id) : fav.delete(id);
    this.favoritedIds.set(fav);
    this.ideas.update(list => list.map(i => i.id === id ? {
      ...i,
      engagement: { ...i.engagement, favoritedBy: res.favoritedBy }
    } : i));
  }

  async incrementShare(id: string): Promise<void> {
    const userEmail = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const userObjectId = this.auth.currentUser()?.id;
    if (!userEmail) {
      return;
    }

    const res = await firstValueFrom(
      this.http.post<{ shares: number; sharedBy: Array<{ sharedBy: string; sharedByObjectId?: string; sharedAt: string }> }>(
        `${API}/reactions/share/${id}`,
        { userEmail, userObjectId }
      )
    );
    this.ideas.update(list => list.map(i => i.id === id ? {
      ...i,
      engagement: { ...i.engagement, shares: res.shares, sharedBy: res.sharedBy }
    } : i));
  }

  // ── Comments ───────────────────────────────────────────────────────────────
  async addComment(
    ideaId: string,
    text: string,
    author: string,
    avatar: string,
    avatarColor: string,
    commenterEmail: string,
    commenterObjectId?: string
  ): Promise<void> {
    const comment = await firstValueFrom(
      this.http.post<Comment>(`${API}/ideas/${ideaId}/comments`, {
        text,
        author,
        avatar,
        avatarColor,
        authorEmail: commenterEmail,
        authorObjectId: commenterObjectId
      })
    );
    this.ideas.update(list => list.map(i => i.id === ideaId ? {
      ...i,
      content: { ...i.content, comments: [...i.content.comments, comment] }
    } : i));
  }

  // ── Create / Edit ──────────────────────────────────────────────────────────
  async createIdea(data: {
    title: string; description: string; author: string; authorEmail: string;
    authorObjectId?: string;
    tags: string[]; avatar: string; avatarColor: string; coverImage?: string; coverPosition?: string;
  }): Promise<Idea> {
    const idea = await firstValueFrom(this.http.post<Idea>(`${API}/ideas`, data));
    this.ideas.update(list => [idea, ...list]);
    return idea;
  }

  async editIdea(id: string, data: { title: string; description: string; tags: string[]; coverImage?: string; coverPosition?: string }): Promise<void> {
    const updated = await firstValueFrom(this.http.put<Idea>(`${API}/ideas/${id}`, {
      ...data,
      updatedBy: (this.auth.currentUser()?.email ?? '').toLowerCase(),
      updatedByObjectId: this.auth.currentUser()?.id
    }));
    this.ideas.update(list => list.map(i => i.id === id ? updated : i));
  }

  // ── Drafts (localStorage, max 5) ──────────────────────────────────────────
  saveDraft(data: {
    id?: string; title: string; description: string; author: string; authorEmail: string;
    authorObjectId?: string;
    tags: string[]; avatar: string; avatarColor: string; coverImage?: string; coverPosition?: string;
  }): string {
    const existing = this.drafts();
    const draftId = data.id ?? `draft-${uid()}`;
    const now = new Date().toISOString();
    const authorEmail = data.authorEmail.toLowerCase();
    const draft: Idea = {
      id: draftId,
      ideaInformation: {
        title: data.title.trim() || 'Untitled Draft',
        description: data.description,
        tags: data.tags,
        status: 'draft',
        coverImage: data.coverImage,
        coverPosition: data.coverPosition ?? '50% 50%'
      },
      authorInformation: {
        name: data.author,
        email: authorEmail,
        objectId: data.authorObjectId,
        avatar: data.avatar,
        avatarColor: data.avatarColor
      },
      collaboratorInformation: {
        members: [{
          id: authorEmail,
          name: data.author,
          objectId: data.authorObjectId,
          avatar: data.avatar,
          avatarColor: data.avatarColor,
          role: 'Owner',
          email: authorEmail,
          joinedDate: now
        }]
      },
      engagement: { likes: 0, shares: 0, likedBy: [], favoritedBy: [], sharedBy: [] },
      content: { attachments: [], comments: [], collaborationNotes: [], collaborationRequests: [] },
      audit: {
        createdBy: authorEmail,
        createdByObjectId: data.authorObjectId,
        createdDate: now,
        updatedBy: authorEmail,
        updatedByObjectId: data.authorObjectId,
        updatedDate: now,
        history: [{ action: 'draft_saved', changedBy: authorEmail, changedByObjectId: data.authorObjectId, changedAt: now }]
      }
    };
    // Update existing or prepend new (cap at MAX_DRAFTS)
    const idx = existing.findIndex(d => d.id === draftId);
    let updated: Idea[];
    if (idx >= 0) {
      updated = existing.map(d => d.id === draftId ? draft : d);
    } else {
      updated = [draft, ...existing].slice(0, MAX_DRAFTS);
    }
    this.drafts.set(updated);
    this.persistDrafts();
    return draftId;
  }

  deleteDraft(id: string): void {
    this.drafts.update(list => list.filter(d => d.id !== id));
    this.persistDrafts();
  }

  async publishDraft(draft: Idea): Promise<void> {
    await this.createIdea({
      title: draft.ideaInformation.title,
      description: draft.ideaInformation.description,
      author: draft.authorInformation.name,
      authorEmail: draft.authorInformation.email,
      authorObjectId: draft.authorInformation.objectId,
      avatar: draft.authorInformation.avatar,
      avatarColor: draft.authorInformation.avatarColor,
      tags: draft.ideaInformation.tags,
      coverImage: draft.ideaInformation.coverImage,
      coverPosition: draft.ideaInformation.coverPosition
    });
    this.deleteDraft(draft.id);
  }

  private persistDrafts(): void {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(this.drafts())); } catch {}
  }

  private loadDrafts(): Idea[] {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const parsed = raw ? (JSON.parse(raw) as Idea[]) : [];
      return parsed.map(d => ({
        ...d,
        engagement: {
          ...d.engagement,
          likedBy: Array.isArray(d.engagement?.likedBy) ? d.engagement.likedBy : [],
          favoritedBy: Array.isArray(d.engagement?.favoritedBy) ? d.engagement.favoritedBy : [],
          sharedBy: Array.isArray(d.engagement?.sharedBy) ? d.engagement.sharedBy : []
        },
        audit: {
          ...d.audit,
          history: Array.isArray(d.audit?.history) ? d.audit.history : [],
          createdDate: toIso(d.audit?.createdDate),
          updatedDate: toIso(d.audit?.updatedDate)
        }
      }));
    } catch { return []; }
  }

  // ── Attachments ────────────────────────────────────────────────────────────
  async addAttachment(ideaId: string, attachment: Omit<IdeaAttachment, 'id'>): Promise<void> {
    const uploadedByEmail = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const uploadedByObjectId = this.auth.currentUser()?.id;
    const full = await firstValueFrom(
      this.http.post<IdeaAttachment>(`${API}/attachments/${ideaId}`, { ...attachment, uploadedByEmail, uploadedByObjectId })
    );
    this.ideas.update(list => list.map(i => i.id === ideaId ? {
      ...i,
      content: { ...i.content, attachments: [...i.content.attachments, full] }
    } : i));
  }

  async removeAttachment(ideaId: string, attachmentId: string): Promise<void> {
    const updatedBy = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const updatedByObjectId = this.auth.currentUser()?.id;
    await firstValueFrom(this.http.delete(`${API}/attachments/${ideaId}/${attachmentId}`, { body: { updatedBy, updatedByObjectId } }));
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? {
        ...i,
        content: { ...i.content, attachments: i.content.attachments.filter(a => a.id !== attachmentId) }
      } : i
    ));
  }

  // ── Collaboration requests ─────────────────────────────────────────────────
  async sendCollaborationRequest(
    ideaId: string, req: Omit<CollaborationRequest, 'id' | 'date' | 'status'>
  ): Promise<void> {
    const full = await firstValueFrom(
      this.http.post<CollaborationRequest>(`${API}/ideas/${ideaId}/requests`, req)
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? {
        ...i,
        content: { ...i.content, collaborationRequests: [...i.content.collaborationRequests, full] }
      } : i
    ));
  }

  async respondToRequest(ideaId: string, requestId: string, status: 'accepted' | 'declined'): Promise<void> {
    await firstValueFrom(this.http.patch(`${API}/ideas/${ideaId}/requests/${requestId}`, {
      status,
      decidedBy: (this.auth.currentUser()?.email ?? '').toLowerCase(),
      decidedByObjectId: this.auth.currentUser()?.id
    }));
    await this.reloadIdea(ideaId);
  }

  // ── Collaborators ──────────────────────────────────────────────────────────
  async addCollaborator(ideaId: string, collaborator: Omit<Collaborator, 'id' | 'joinedDate'>): Promise<void> {
    const addedBy = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const addedByObjectId = this.auth.currentUser()?.id;
    const full = await firstValueFrom(
      this.http.post<Collaborator>(`${API}/ideas/${ideaId}/collaborators`, { ...collaborator, addedBy, addedByObjectId })
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? {
        ...i,
        collaboratorInformation: {
          ...i.collaboratorInformation,
          members: [...i.collaboratorInformation.members, full]
        }
      } : i
    ));
  }

  async removeCollaborator(ideaId: string, collaboratorId: string): Promise<void> {
    const removedBy = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const removedByObjectId = this.auth.currentUser()?.id;
    await firstValueFrom(this.http.delete(`${API}/ideas/${ideaId}/collaborators/${collaboratorId}`, {
      body: { removedBy, removedByObjectId }
    }));
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? {
        ...i,
        collaboratorInformation: {
          ...i.collaboratorInformation,
          members: i.collaboratorInformation.members.filter(c => c.id !== collaboratorId)
        }
      } : i
    ));
  }

  // ── Collaboration notes ────────────────────────────────────────────────────
  async addCollaborationNote(
    ideaId: string, text: string, author: string, avatar: string, avatarColor: string
  ): Promise<void> {
    const authorEmail = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const authorObjectId = this.auth.currentUser()?.id;
    const note = await firstValueFrom(
      this.http.post<CollaborationNote>(`${API}/ideas/${ideaId}/notes`, {
        text,
        author,
        avatar,
        avatarColor,
        authorEmail,
        authorObjectId
      })
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? {
        ...i,
        content: { ...i.content, collaborationNotes: [...i.content.collaborationNotes, note] }
      } : i
    ));
  }

  async togglePinNote(ideaId: string, noteId: string): Promise<void> {
    const updatedBy = (this.auth.currentUser()?.email ?? '').toLowerCase();
    const updatedByObjectId = this.auth.currentUser()?.id;
    const note = await firstValueFrom(
      this.http.patch<CollaborationNote>(`${API}/ideas/${ideaId}/notes/${noteId}/pin`, { updatedBy, updatedByObjectId })
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId
        ? {
          ...i,
          content: {
            ...i.content,
            collaborationNotes: i.content.collaborationNotes.map(n => n.id === noteId ? note : n)
          }
        }
        : i
    ));
  }

  private async reloadIdea(id: string): Promise<void> {
    const idea = await firstValueFrom(this.http.get<Idea>(`${API}/ideas/${id}`));
    this.ideas.update(list => list.map(i => i.id === id ? idea : i));
  }
}
