import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  Idea, Comment, Collaborator, CollaborationNote,
  CollaborationRequest, IdeaAttachment
} from '../models/idea.model';

// Dev: proxied to http://localhost:3000 via proxy.conf.json
// Prod: point to your deployed API URL
const API = '/api';

interface ReactionsState { likedIds: string[]; favoritedIds: string[]; }

@Injectable({ providedIn: 'root' })
export class IdeaService {
  private http = inject(HttpClient);

  ideas        = signal<Idea[]>([]);
  likedIds     = signal<Set<string>>(new Set());
  favoritedIds = signal<Set<string>>(new Set());
  loading      = signal(false);
  error        = signal<string | null>(null);

  constructor() { this.loadAll(); }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  async loadAll(): Promise<void> {
    this.loading.set(true);
    try {
      const [ideas, reactions] = await Promise.all([
        firstValueFrom(this.http.get<Idea[]>(`${API}/ideas`)),
        firstValueFrom(this.http.get<ReactionsState>(`${API}/reactions`))
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
    const res  = await firstValueFrom(
      this.http.post<{ liked: boolean; likes: number }>(`${API}/reactions/like/${id}`, {})
    );
    const liked = new Set(this.likedIds());
    res.liked ? liked.add(id) : liked.delete(id);
    this.likedIds.set(liked);
    this.ideas.update(list => list.map(i => i.id === id ? { ...i, likes: res.likes } : i));
  }

  async toggleFavorite(id: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<{ favorited: boolean }>(`${API}/reactions/favorite/${id}`, {})
    );
    const fav = new Set(this.favoritedIds());
    res.favorited ? fav.add(id) : fav.delete(id);
    this.favoritedIds.set(fav);
  }

  async incrementShare(id: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<{ shares: number }>(`${API}/reactions/share/${id}`, {})
    );
    this.ideas.update(list => list.map(i => i.id === id ? { ...i, shares: res.shares } : i));
  }

  // ── Comments ───────────────────────────────────────────────────────────────
  async addComment(ideaId: string, text: string, author: string, avatar: string, avatarColor: string): Promise<void> {
    const comment = await firstValueFrom(
      this.http.post<Comment>(`${API}/ideas/${ideaId}/comments`, { text, author, avatar, avatarColor })
    );
    this.ideas.update(list => list.map(i => i.id === ideaId ? { ...i, comments: [...i.comments, comment] } : i));
  }

  // ── Create / Edit ──────────────────────────────────────────────────────────
  async createIdea(data: {
    title: string; description: string; author: string; authorId: string;
    tags: string[]; avatar: string; avatarColor: string;
  }): Promise<Idea> {
    const idea = await firstValueFrom(this.http.post<Idea>(`${API}/ideas`, data));
    this.ideas.update(list => [idea, ...list]);
    return idea;
  }

  async editIdea(id: string, data: { title: string; description: string; tags: string[] }): Promise<void> {
    const updated = await firstValueFrom(this.http.put<Idea>(`${API}/ideas/${id}`, data));
    this.ideas.update(list => list.map(i => i.id === id ? updated : i));
  }

  // ── Attachments ────────────────────────────────────────────────────────────
  async addAttachment(ideaId: string, attachment: Omit<IdeaAttachment, 'id'>): Promise<void> {
    const full = await firstValueFrom(
      this.http.post<IdeaAttachment>(`${API}/attachments/${ideaId}`, attachment)
    );
    this.ideas.update(list => list.map(i => i.id === ideaId ? { ...i, attachments: [...i.attachments, full] } : i));
  }

  async removeAttachment(ideaId: string, attachmentId: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API}/attachments/${ideaId}/${attachmentId}`));
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? { ...i, attachments: i.attachments.filter(a => a.id !== attachmentId) } : i
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
      i.id === ideaId ? { ...i, collaborationRequests: [...i.collaborationRequests, full] } : i
    ));
  }

  async respondToRequest(ideaId: string, requestId: string, status: 'accepted' | 'declined'): Promise<void> {
    await firstValueFrom(this.http.patch(`${API}/ideas/${ideaId}/requests/${requestId}`, { status }));
    // Reload the single idea to get the updated collaborators list if accepted
    await this.reloadIdea(ideaId);
  }

  // ── Collaborators ──────────────────────────────────────────────────────────
  async addCollaborator(ideaId: string, collaborator: Omit<Collaborator, 'id' | 'joinedDate'>): Promise<void> {
    const full = await firstValueFrom(
      this.http.post<Collaborator>(`${API}/ideas/${ideaId}/collaborators`, collaborator)
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? { ...i, collaborators: [...i.collaborators, full] } : i
    ));
  }

  async removeCollaborator(ideaId: string, collaboratorId: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API}/ideas/${ideaId}/collaborators/${collaboratorId}`));
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? { ...i, collaborators: i.collaborators.filter(c => c.id !== collaboratorId) } : i
    ));
  }

  // ── Collaboration notes ────────────────────────────────────────────────────
  async addCollaborationNote(
    ideaId: string, text: string, author: string, avatar: string, avatarColor: string
  ): Promise<void> {
    const note = await firstValueFrom(
      this.http.post<CollaborationNote>(`${API}/ideas/${ideaId}/notes`, { text, author, avatar, avatarColor })
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId ? { ...i, collaborationNotes: [...i.collaborationNotes, note] } : i
    ));
  }

  async togglePinNote(ideaId: string, noteId: string): Promise<void> {
    const note = await firstValueFrom(
      this.http.patch<CollaborationNote>(`${API}/ideas/${ideaId}/notes/${noteId}/pin`, {})
    );
    this.ideas.update(list => list.map(i =>
      i.id === ideaId
        ? { ...i, collaborationNotes: i.collaborationNotes.map(n => n.id === noteId ? note : n) }
        : i
    ));
  }

  // ── Private helpers ────────────────────────────────────────────────────────
  private async reloadIdea(id: string): Promise<void> {
    const idea = await firstValueFrom(this.http.get<Idea>(`${API}/ideas/${id}`));
    this.ideas.update(list => list.map(i => i.id === id ? idea : i));
  }
}
