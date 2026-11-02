import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withDisabledInitialNavigation, Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
  MsalBroadcastService
} from '@azure/msal-angular';

import { routes } from './app.routes';
import {
  MSALGuardConfigFactory,
  MSALInstanceFactory,
  MSALInterceptorConfigFactory
} from './security/security.config';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // Initial navigation is deferred until MSAL has processed the redirect result,
    // otherwise MsalGuard runs before the signed-in account exists.
    provideRouter(routes, withDisabledInitialNavigation()),
    provideHttpClient(withInterceptorsFromDi()),

    // MSAL
    importProvidersFrom(MsalModule),
    { provide: MSAL_INSTANCE,           useFactory: MSALInstanceFactory           },
    { provide: MSAL_GUARD_CONFIG,       useFactory: MSALGuardConfigFactory        },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory  },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },

    provideAppInitializer(() => {
      const msal   = inject(MsalService);
      const auth   = inject(AuthService);
      const router = inject(Router);

      return (async () => {
        try {
          await msal.instance.initialize();
          const result  = await msal.instance.handleRedirectPromise();
          const account = result?.account ?? msal.instance.getAllAccounts()[0] ?? null;

          if (account) {
            msal.instance.setActiveAccount(account);
            await auth.hydrateFromMsal(account, result?.accessToken);
          }
        } catch (err) {
          console.error('[MSAL] initialisation failed:', err);
        } finally {
          router.initialNavigation();
        }
      })();
    })
  ]
};
