import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { IdeaCardComponent } from '../idea-card/idea-card.component';

type SortMode = 'recent' | 'liked' | 'collaborated';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IdeaCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  ideaService    = inject(IdeaService);
  private router = inject(Router);

  sort   = signal<SortMode>('recent');
  search = signal('');

  sortTitles: Record<SortMode, string> = {
    recent:      'Latest Ideas',
    liked:       'Most Liked Ideas',
    collaborated:'Most Collaborated Ideas'
  };

  displayed = computed(() => {
    let list = this.ideaService.ideas().filter(i => (i.status ?? 'published') === 'published');

    const q = this.search().toLowerCase();
    if (q) {
      list = list.filter(i =>
        i.title.toLowerCase().includes(q)       ||
        i.description.toLowerCase().includes(q) ||
        i.author.toLowerCase().includes(q)      ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    switch (this.sort()) {
      case 'liked':       return [...list].sort((a, b) => b.likes - a.likes);
      case 'collaborated':return [...list].sort((a, b) => b.collaborators.length - a.collaborators.length);
      default:            return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  });

  private sortHandler   = (e: Event) => this.sort.set((e as CustomEvent).detail);
  private searchHandler = (e: Event) => this.search.set((e as CustomEvent).detail);

  ngOnInit(): void {
    window.addEventListener('vip:sort',   this.sortHandler);
    window.addEventListener('vip:search', this.searchHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('vip:sort',   this.sortHandler);
    window.removeEventListener('vip:search', this.searchHandler);
  }

  openDetail(id: string): void { this.router.navigate(['/idea', id]); }
}
