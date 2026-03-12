import { Injectable, signal, computed } from '@angular/core';
import { AppNotification } from '../models/idea.model';

const STORAGE_KEY = 'vip-notifications-v1';

function uid(): string { return Math.random().toString(36).slice(2, 10); }
function today(): string { return new Date().toISOString(); }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<AppNotification[]>(this.load());

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  add(n: Omit<AppNotification, 'id' | 'date' | 'read'>): void {
    const notif: AppNotification = { ...n, id: uid(), date: today(), read: false };
    this.notifications.update(list => [notif, ...list]);
    this.save();
  }

  markRead(id: string): void {
    this.notifications.update(list => list.map(n => n.id === id ? { ...n, read: true } : n));
    this.save();
  }

  markAllRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
    this.save();
  }

  remove(id: string): void {
    this.notifications.update(list => list.filter(n => n.id !== id));
    this.save();
  }

  private save(): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notifications())); } catch {}
  }

  private load(): AppNotification[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}
