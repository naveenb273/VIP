import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';

type ProfileTab = 'created' | 'saved' | 'collaborated';

const COVER_EMOJIS = ['🌱','💡','🌿','🔬','♻️','🌍','⚡','🌊','🍃','🔋'];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  svc    = inject(IdeaService);
  auth   = inject(AuthService);
  router = inject(Router);
  route  = inject(ActivatedRoute);

  activeTab = signal<ProfileTab>('created');

  constructor() {
    this.route.queryParams.subscribe(p => {
      const tab = p['tab'] as ProfileTab;
      if (tab && ['created','saved','collaborated'].includes(tab)) {
        this.activeTab.set(tab);
      }
    });
  }
  user      = computed(() => this.auth.currentUser());

  tabs = [
    { id: 'created'     as ProfileTab, icon: '💡', label: 'My Ideas'    },
    { id: 'saved'       as ProfileTab, icon: '⭐', label: 'Saved Ideas' },
    { id: 'collaborated'as ProfileTab, icon: '🤝', label: 'Collaborated'},
  ];

  createdIdeas = computed(() => {
    const email = (this.user()?.email ?? '').toLowerCase();
    return email
      ? this.svc.ideas().filter(i =>
        (i.authorInformation.email ?? '').toLowerCase() === email &&
        (i.ideaInformation.status ?? 'published') === 'published'
      )
      : [];
  });

  /** Saved = starred/favorited ideas */
  savedIdeas = computed(() =>
    this.svc.ideas().filter(i => this.svc.isFavorited(i.id))
  );

  collaboratedIdeas = computed(() => {
    const user = this.user();
    if (!user) return [];
    return this.svc.ideas().filter(i =>
      (i.authorInformation.email ?? '').toLowerCase() !== user.email.toLowerCase() &&
      i.collaboratorInformation.members.some(c => c.name === user.name || c.email === user.email)
    );
  });

  displayed = computed(() => {
    switch (this.activeTab()) {
      case 'saved':        return this.savedIdeas();
      case 'collaborated': return this.collaboratedIdeas();
      default:             return this.createdIdeas();
    }
  });

  tabCount(id: ProfileTab): number {
    switch (id) {
      case 'saved':        return this.savedIdeas().length;
      case 'collaborated': return this.collaboratedIdeas().length;
      default:             return this.createdIdeas().length;
    }
  }

  coverEmoji(title: string): string {
    return COVER_EMOJIS[title.charCodeAt(0) % COVER_EMOJIS.length];
  }

  emptyIcon(): string {
    const map: Record<ProfileTab, string> = { created:'💡', saved:'⭐', collaborated:'🤝' };
    return map[this.activeTab()];
  }
  emptyTitle(): string {
    const map: Record<ProfileTab, string> = {
      created: 'No ideas published yet.',
      saved:   'No saved ideas yet.',
      collaborated: 'No collaborations yet.'
    };
    return map[this.activeTab()];
  }
  emptySub(): string {
    const map: Record<ProfileTab, string> = {
      created: 'Share your first idea with the community!',
      saved:   'Star ideas you love — they\'ll appear here.',
      collaborated: 'Join a project or get invited by an idea owner.'
    };
    return map[this.activeTab()];
  }

  openIdea(id: string): void { this.router.navigate(['/idea', id]); }
}
