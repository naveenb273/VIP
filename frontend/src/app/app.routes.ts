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
    // Public — MSAL redirect lands here after login
    path: 'login',
    loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: '' }
];
