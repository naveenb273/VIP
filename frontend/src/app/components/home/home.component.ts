import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { IdeaCardComponent } from '../idea-card/idea-card.component';

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

  filter = signal<'all' | 'favorites'>('all');
  search = signal('');

  displayed = computed(() => {
    let list = this.ideaService.ideas();
    if (this.filter() === 'favorites') {
      list = list.filter(i => this.ideaService.isFavorited(i.id));
    }
    const q = this.search().toLowerCase();
    if (q) {
      list = list.filter(i =>
        i.title.toLowerCase().includes(q)       ||
        i.description.toLowerCase().includes(q) ||
        i.author.toLowerCase().includes(q)      ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  });

  private filterHandler = (e: Event) => this.filter.set((e as CustomEvent).detail);
  private searchHandler = (e: Event) => this.search.set((e as CustomEvent).detail);

  ngOnInit(): void {
    window.addEventListener('ideaflow:filter', this.filterHandler);
    window.addEventListener('ideaflow:search', this.searchHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('ideaflow:filter', this.filterHandler);
    window.removeEventListener('ideaflow:search', this.searchHandler);
  }

  openDetail(id: string): void {
    this.router.navigate(['/idea', id]);
  }
}
