import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventType, AuthenticationResult } from '@azure/msal-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private theme     = inject(ThemeService);
  private auth      = inject(AuthService);
  private router    = inject(Router);
  private msal      = inject(MsalService);
  private broadcast = inject(MsalBroadcastService);

  showNav = signal(false);

  ngOnInit(): void {
    // Apply theme token on document root
    document.documentElement.setAttribute('data-theme', this.theme.theme());

    // MSAL must be initialised before any interaction can occur
    this.msal.instance.initialize().then(() => {

      // Process the redirect result that MSAL writes back into the browser
      this.msal.instance.handleRedirectPromise()
        .then(result => {
          if (result?.account) {
            this.msal.instance.setActiveAccount(result.account);
            this.auth.hydrateFromMsal(result.account, result.accessToken);
          } else {
            // Page refresh — restore the active account that is already cached
            const accounts = this.msal.instance.getAllAccounts();
            if (accounts.length) {
              this.msal.instance.setActiveAccount(accounts[0]);
              this.auth.hydrateFromMsal(accounts[0]);
            }
          }
        })
        .catch(err => console.error('[MSAL] handleRedirectPromise error:', err));

    });

    // Also listen for popup / silent success events
    this.broadcast.msalSubject$
      .pipe(
        filter(e => e.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        const result = e.payload as AuthenticationResult;
        if (result?.account) {
          this.msal.instance.setActiveAccount(result.account);
          this.auth.hydrateFromMsal(result.account, result.accessToken);
        }
      });

    // Show / hide navbar depending on route
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroy$))
      .subscribe((e: any) => {
        this.showNav.set(!e.urlAfterRedirects.startsWith('/login'));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
