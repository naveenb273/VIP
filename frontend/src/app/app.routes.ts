import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    canActivate: [MsalGuard],
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'idea/:id',
    canActivate: [MsalGuard],
    loadComponent: () => import('./components/idea-detail/idea-detail.component').then(m => m.IdeaDetailComponent)
  },
  {
    path: 'profile',
    canActivate: [MsalGuard],
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'notifications',
    canActivate: [MsalGuard],
    loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'drafts',
    canActivate: [MsalGuard],
    loadComponent: () => import('./components/drafts/drafts.component').then(m => m.DraftsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: '' }
];
