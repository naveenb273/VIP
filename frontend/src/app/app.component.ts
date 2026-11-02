import { Component, OnInit, OnDestroy, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventType, AuthenticationResult } from '@azure/msal-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { MicrofrontendLoaderService } from './services/microfrontend-loader.service';

const CHATBOT_BUNDLE_URL = 'assets/mfe/agentic-chatbot/main.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  private mfe       = inject(MicrofrontendLoaderService);

  showNav = signal(false);
  chatbotReady = signal(false);

  ngOnInit(): void {
    // Apply theme token on document root
    document.documentElement.setAttribute('data-theme', this.theme.theme());

    // Agentic Chatbot micro-frontend is built separately and registers its own custom element
    this.mfe.load(CHATBOT_BUNDLE_URL)
      .then(() => this.chatbotReady.set(true))
      .catch(err => console.warn('[VIP] Agentic Chatbot micro-frontend unavailable', err));

    // MSAL init + redirect handling happens in the app initialiser (app.config.ts),
    // so guards never run before the signed-in account is known.

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
          void this.auth.hydrateFromMsal(result.account, result.accessToken);
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
