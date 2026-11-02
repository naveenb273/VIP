import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { IdeasSideMenuComponent, SortMode, SortDirection } from '../ideas-side-menu/ideas-side-menu.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { CopyLinkModalComponent } from '../shared/copy-link-modal/copy-link-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IdeaCardComponent, IdeasSideMenuComponent, PaginationComponent, CopyLinkModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ideaService    = inject(IdeaService);
  private router = inject(Router);
  readonly pageSize = 15;

  sort   = signal<SortMode>('recent');
  sortDirection = signal<SortDirection>(null);
  search = signal('');
  tagFilter = signal('');
  emailFilter = signal('');
  currentPage = signal(1);
  jumpPage = signal<number | null>(null);
  shareIdeaId = signal<string | null>(null);
  shareIdeaTitle = signal('');

  displayed = computed(() => {
    let list = this.ideaService.ideas().filter(i => (i.ideaInformation.status ?? 'published') === 'published');
    const activeDirection = this.sortDirection() ?? 'desc';

    const q = this.search().toLowerCase();
    if (q) {
      list = list.filter(i =>
        i.ideaInformation.title.toLowerCase().includes(q)       ||
        i.ideaInformation.description.toLowerCase().includes(q) ||
        i.authorInformation.name.toLowerCase().includes(q)      ||
        i.ideaInformation.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const tagQuery = this.tagFilter().toLowerCase().trim();
    if (tagQuery) {
      list = list.filter(i =>
        i.ideaInformation.tags.some(t => t.toLowerCase().includes(tagQuery))
      );
    }

    const emailQuery = this.emailFilter().toLowerCase().trim();
    if (emailQuery) {
      list = list.filter(i => {
        const collaboratorEmailMatch = i.collaboratorInformation.members.some(c =>
          (c.email ?? '').toLowerCase().includes(emailQuery)
        );

        const authorEmailMatch = (i.authorInformation.email ?? '').toLowerCase().includes(emailQuery);
        return collaboratorEmailMatch || authorEmailMatch;
      });
    }

    switch (this.sort()) {
      case 'liked': {
        return [...list].sort((a, b) =>
          activeDirection === 'asc' ? a.engagement.likes - b.engagement.likes : b.engagement.likes - a.engagement.likes
        );
      }
      case 'collaborated': {
        return [...list].sort((a, b) => {
          const diff = a.collaboratorInformation.members.length - b.collaboratorInformation.members.length;
          return activeDirection === 'asc' ? diff : -diff;
        });
      }
      default: {
        return [...list].sort((a, b) => {
          const diff = new Date(a.audit.createdDate).getTime() - new Date(b.audit.createdDate).getTime();
          return activeDirection === 'asc' ? diff : -diff;
        });
      }
    }
  });

  totalIdeas = computed(() => this.displayed().length);

  totalPages = computed(() => {
    if (this.totalIdeas() === 0) {
      return 0;
    }
    return Math.ceil(this.totalIdeas() / this.pageSize);
  });

  pagedIdeas = computed(() => {
    if (this.totalIdeas() === 0) {
      return [];
    }

    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * this.pageSize;
    return this.displayed().slice(start, start + this.pageSize);
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    if (total <= 0) {
      return [] as number[];
    }

    const page = Math.min(this.currentPage(), total);
    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);

    let start = Math.max(1, page - halfWindow);
    let end = Math.min(total, start + windowSize - 1);

    if (end - start + 1 < windowSize) {
      start = Math.max(1, end - windowSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  });

  rangeStart = computed(() => {
    if (this.totalIdeas() === 0) {
      return 0;
    }
    return (Math.min(this.currentPage(), this.totalPages()) - 1) * this.pageSize + 1;
  });

  rangeEnd = computed(() => {
    if (this.totalIdeas() === 0) {
      return 0;
    }
    return Math.min(this.rangeStart() + this.pageSize - 1, this.totalIdeas());
  });

  onSearchChange(value: string): void {
    this.search.set(value);
    this.currentPage.set(1);
    this.jumpPage.set(1);
  }

  onTagFilterChange(value: string): void {
    this.tagFilter.set(value);
    this.currentPage.set(1);
    this.jumpPage.set(1);
  }

  onEmailFilterChange(value: string): void {
    this.emailFilter.set(value);
    this.currentPage.set(1);
    this.jumpPage.set(1);
  }

  onSortClick(mode: SortMode): void {
    if (this.sort() !== mode) {
      this.sort.set(mode);
      this.sortDirection.set('desc');
      this.currentPage.set(1);
      this.jumpPage.set(1);
      return;
    }

    const currentDirection = this.sortDirection();
    if (currentDirection === null) {
      this.sortDirection.set('desc');
      this.currentPage.set(1);
      this.jumpPage.set(1);
      return;
    }

    if (currentDirection === 'desc') {
      this.sortDirection.set('asc');
      this.currentPage.set(1);
      this.jumpPage.set(1);
      return;
    }

    this.sortDirection.set(null);
    this.currentPage.set(1);
    this.jumpPage.set(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);
    this.jumpPage.set(page);
  }

  goFirst(): void {
    this.goToPage(1);
  }

  goLast(): void {
    this.goToPage(this.totalPages());
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  onJumpPageChange(value: number | null): void {
    this.jumpPage.set(value);
  }

  submitJump(): void {
    const raw = this.jumpPage();
    if (raw === null || Number.isNaN(raw)) {
      return;
    }

    const target = Math.max(1, Math.min(this.totalPages(), Math.trunc(raw)));
    this.goToPage(target);
  }

  openShareModal(id: string, title: string): void {
    this.shareIdeaId.set(id);
    this.shareIdeaTitle.set(title);
  }

  closeShareModal(): void {
    this.shareIdeaId.set(null);
    this.shareIdeaTitle.set('');
  }

  shareUrl(): string {
    const id = this.shareIdeaId();
    if (!id) {
      return '';
    }
    return `${window.location.origin}/idea/${id}`;
  }

  async onShareCopied(): Promise<void> {
    const id = this.shareIdeaId();
    if (!id) {
      return;
    }
    await this.ideaService.incrementShare(id);
  }

  openDetail(id: string): void { this.router.navigate(['/idea', id]); }
}
