import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { firstValueFrom } from 'rxjs';
import { AzureUser } from '../models/idea.model';

const STORAGE_KEY   = 'vip-user-v1';
const AVATAR_COLORS = ['#141414','#575757','#87754e','#146ad1','#009bbe','#00820d','#ae9871','#6b6b6b'];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private msal   = inject(MsalService);
  private http   = inject(HttpClient);

  currentUser = signal<AzureUser | null>(this.loadStoredUser());
  isLoggedIn  = computed(() => this.currentUser() !== null);
  isAdmin     = computed(() => this.currentUser()?.role === 'Admin');

  /**
   * Called by AppComponent after MSAL processes the redirect / restores an account.
   * Maps an AccountInfo to our AzureUser model and persists it locally.
   */
  async hydrateFromMsal(account: AccountInfo, accessToken?: string): Promise<void> {
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
      role:        await this.getUserRole(account.username),
      avatar:      initials,
      avatarColor: color,
      tenantId:    account.tenantId,
      accessToken
    };

    this.currentUser.set(user);
    this.persistUser(user);
  }

  isOwner(authorEmail: string): boolean {
    return (this.currentUser()?.email ?? '').toLowerCase() === (authorEmail ?? '').toLowerCase();
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

  private async getUserRole(email: string): Promise<AzureUser['role']> {
    try {
      const params = new HttpParams().set('email', email);
      const { role } = await firstValueFrom(this.http.get<{ role: AzureUser['role'] }>('/api/users/me', { params }));
      return role === 'Admin' ? 'Admin' : 'User';
    } catch {
      return 'User';
    }
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
