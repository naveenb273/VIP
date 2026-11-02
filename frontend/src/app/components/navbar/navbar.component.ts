import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';
import { filter } from 'rxjs/operators';
import { CreateIdeaModalComponent } from '../create-idea-modal/create-idea-modal.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateIdeaModalComponent, ThemeToggleComponent, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private router = inject(Router);
  auth   = inject(AuthService);
  notifs = inject(NotificationService);

  isHome         = signal(true);
  showModal      = signal(false);
  showUserMenu   = signal(false);

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isHome.set(e.urlAfterRedirects === '/');
        this.showUserMenu.set(false);
      });
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

  goAdmin(): void {
    this.showUserMenu.set(false);
    this.router.navigate(['/admin']);
  }

  async logout(): Promise<void> {
    this.showUserMenu.set(false);
    await this.auth.logout();
  }
}
