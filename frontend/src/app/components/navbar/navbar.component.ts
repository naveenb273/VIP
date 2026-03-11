import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { CreateIdeaModalComponent } from '../create-idea-modal/create-idea-modal.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CreateIdeaModalComponent, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private router = inject(Router);
  auth = inject(AuthService);

  isHome         = signal(true);
  activeFilter   = signal<'all' | 'favorites'>('all');
  showModal      = signal(false);
  mobileMenuOpen = signal(false);
  showUserMenu   = signal(false);
  searchQuery    = '';

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isHome.set(e.urlAfterRedirects === '/');
        this.mobileMenuOpen.set(false);
        this.showUserMenu.set(false);
      });
  }

  setFilter(f: 'all' | 'favorites'): void {
    this.activeFilter.set(f);
    window.dispatchEvent(new CustomEvent('ideaflow:filter', { detail: f }));
  }

  onSearch(q: string): void {
    window.dispatchEvent(new CustomEvent('ideaflow:search', { detail: q }));
  }

  async logout(): Promise<void> {
    this.showUserMenu.set(false);
    await this.auth.logout();
  }
}
