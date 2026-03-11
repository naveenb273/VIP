import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser  = isPlatformBrowser(this.platformId);

  theme = signal<Theme>('light');

  constructor() {
    this.theme.set(this.getInitial());

    effect(() => {
      if (!this.isBrowser) return;
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('vip-theme', t); } catch { /* noop */ }
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  private getInitial(): Theme {
    if (!this.isBrowser) return 'light';
    try {
      const saved = localStorage.getItem('vip-theme') as Theme;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* noop */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
