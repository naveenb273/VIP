import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { AzureUser } from '../models/idea.model';

const STORAGE_KEY   = 'vip-user-v1';
const AVATAR_COLORS = ['#003057','#1c4f82','#1a6496','#2e6b7a','#5a3e8c','#8b3a5a','#1a5c3f','#7a5c1a'];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private msal   = inject(MsalService);

  currentUser = signal<AzureUser | null>(this.loadStoredUser());
  isLoggedIn  = computed(() => this.currentUser() !== null);

  /**
   * Called by AppComponent after MSAL processes the redirect / restores an account.
   * Maps an AccountInfo to our AzureUser model and persists it locally.
   */
  hydrateFromMsal(account: AccountInfo, accessToken?: string): void {
    const parts    = (account.name ?? account.username ?? 'U').trim().split(' ');
    const initials = parts.map(w => w[0] ?? '').join('').slice(0, 2).toUpperCase();

    // Keep the same colour across sessions for this user
    const stored     = this.loadStoredUser();
    const color      = (stored?.id === (account.localAccountId || account.homeAccountId))
                       ? (stored.avatarColor ?? this.randomColor())
                       : this.randomColor();

    const user: AzureUser = {
      id:          account.localAccountId || account.homeAccountId,
      name:        account.name ?? account.username,
      email:       account.username,
      avatar:      initials,
      avatarColor: color,
      tenantId:    account.tenantId,
      accessToken
    };

    this.currentUser.set(user);
    this.persistUser(user);
  }

  isOwner(authorId: string): boolean {
    return this.currentUser()?.id === authorId;
  }

  async logout(): Promise<void> {
    this.currentUser.set(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }

    const accounts = this.msal.instance.getAllAccounts();
    if (accounts.length) {
      // logoutRedirect clears the Azure session and returns to /login
      await this.msal.instance.logoutRedirect({
        account: accounts[0],
        postLogoutRedirectUri: window.location.origin + '/login'
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  private randomColor(): string {
    return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  }

  private loadStoredUser(): AzureUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  private persistUser(u: AzureUser): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); } catch { /* noop */ }
  }
}
