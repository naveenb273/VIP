import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication
} from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

// ── Azure Entra ID tenant credentials ────────────────────────────────────────
const CLIENT_ID   = '18830eed-04f6-4959-9ec5-6465b53044f2';
const TENANT_ID   = 'f530c72b-e2d4-46a4-b9de-e55f0b2131da';
const AUTHORITY   = `https://login.microsoftonline.com/${TENANT_ID}`;
const REDIRECT_URI = 'http://localhost:4200';

// ── MSAL Instance factory ─────────────────────────────────────────────────────
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId:    CLIENT_ID,
      authority:   AUTHORITY,
      redirectUri: REDIRECT_URI,
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false
    },
    system: {
      loggerOptions: {
        loggerCallback(level: LogLevel, message: string) {
          if (level <= LogLevel.Warning) console.warn('[MSAL]', message);
        },
        logLevel: LogLevel.Warning,
        piiLoggingEnabled: false
      }
    }
  });
}

// ── Guard config — redirect interaction, not popup ────────────────────────────
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: { scopes: ['openid', 'profile', 'User.Read'] },
    loginFailedRoute: '/login'
  };
}

// ── Interceptor config — protect MS Graph calls only ─────────────────────────
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>([
    ['https://graph.microsoft.com/v1.0/me', ['User.Read']]
    // Add your API URL + scopes here if you protect the backend with Azure AD:
    // ['http://localhost:3000/api', ['api://<your-api-client-id>/access_as_user']]
  ]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}
