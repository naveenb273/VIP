import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication
} from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

// ── Azure Entra ID tenant credentials ────────────────────────────────────────
const CLIENT_ID   = 'f545ff67-2e05-48f3-a6df-61f669b8b525';
const TENANT_ID   = 'f25493ae-1c98-41d7-8a33-0be75f5fe603';
const AUTHORITY   = `https://login.microsoftonline.com/${TENANT_ID}`;
const REDIRECT_URI = window.location.origin;

// ── MSAL Instance factory ─────────────────────────────────────────────────────
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId:    CLIENT_ID,
      authority:   AUTHORITY,
      redirectUri: REDIRECT_URI,
      postLogoutRedirectUri: `${REDIRECT_URI}/login`
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
