import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AppNotification } from '../../models/idea.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifs = inject(NotificationService);
  router = inject(Router);

  open(n: AppNotification): void {
    this.notifs.markRead(n.id);
    if (n.ideaId) this.router.navigate(['/idea', n.ideaId]);
  }

  dismiss(e: Event, id: string): void {
    e.stopPropagation();
    this.notifs.remove(id);
  }

  typeIcon(type: AppNotification['type']): string {
    const map: Record<AppNotification['type'], string> = {
      collab_request:  '🤝',
      collab_accepted: '✅',
      collab_declined: '❌',
      system:          '🔔'
    };
    return map[type];
  }

  timeAgo(date: string): string {
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1)  return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
}
