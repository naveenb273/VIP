import { Injectable } from '@angular/core';

/**
 * Loads independently built micro-frontend bundles at runtime.
 * Each bundle registers its own custom element when evaluated.
 */
@Injectable({ providedIn: 'root' })
export class MicrofrontendLoaderService {
  private loaded = new Map<string, Promise<void>>();

  load(url: string): Promise<void> {
    const existing = this.loaded.get(url);
    if (existing) {
      return existing;
    }

    const pending = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load micro-frontend: ${url}`));
      document.head.appendChild(script);
    });

    this.loaded.set(url, pending);
    return pending;
  }
}
