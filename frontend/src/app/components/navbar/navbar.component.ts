import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { CreateIdeaModalComponent } from '../create-idea-modal/create-idea-modal.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

export type SortMode = 'recent' | 'liked' | 'collaborated';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CreateIdeaModalComponent, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private router = inject(Router);
  auth   = inject(AuthService);
  notifs = inject(NotificationService);

  isHome         = signal(true);
  sortMode       = signal<SortMode>('recent');
  showSortMenu   = signal(false);
  showModal      = signal(false);
  mobileMenuOpen = signal(false);
  showUserMenu   = signal(false);
  searchQuery    = '';

  sortLabels: Record<SortMode, string> = {
    recent:      '🕒 Recent',
    liked:       '❤️ Most Liked',
    collaborated:'🤝 Most Collaborated'
  };

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isHome.set(e.urlAfterRedirects === '/');
        this.mobileMenuOpen.set(false);
        this.showUserMenu.set(false);
        this.showSortMenu.set(false);
      });
  }

  setSort(mode: SortMode): void {
    this.sortMode.set(mode);
    this.showSortMenu.set(false);
    window.dispatchEvent(new CustomEvent('vip:sort', { detail: mode }));
  }

  onSearch(q: string): void {
    window.dispatchEvent(new CustomEvent('vip:search', { detail: q }));
  }

  goProfile(): void {
    this.showUserMenu.set(false);
    this.router.navigate(['/profile']);
  }

  goNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  goDrafts(): void {
    this.showUserMenu.set(false);
    this.router.navigate(['/drafts']);
  }

  goSaved(): void {
    this.showUserMenu.set(false);
    this.router.navigate(['/profile'], { queryParams: { tab: 'saved' } });
  }

  async logout(): Promise<void> {
    this.showUserMenu.set(false);
    await this.auth.logout();
  }
}
