import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IconComponent } from '../../shared/icon/icon.component';
import { AuthService } from '../../../services/auth.service';

interface AdminUser {
  email: string;
  isSuperAdmin: boolean;
}

@Component({
  selector: 'app-admin-access',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.scss']
})
export class AdminAccessComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  admins = signal<AdminUser[]>([]);
  email = '';
  loading = signal(false);
  saving = signal(false);
  removingEmail = signal('');
  error = signal('');
  success = signal('');

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    const requestedBy = this.auth.currentUser()?.email;
    if (!requestedBy) return;

    this.loading.set(true);
    this.error.set('');
    const params = new HttpParams().set('requestedBy', requestedBy);
    this.http.get<{ admins: AdminUser[] }>('/api/users/admins', { params }).subscribe({
      next: ({ admins }) => {
        this.admins.set(admins);
        this.loading.set(false);
      },
      error: (response) => {
        this.error.set(response.error?.error ?? 'Unable to load administrators');
        this.loading.set(false);
      }
    });
  }

  addAdmin(): void {
    const requestedBy = this.auth.currentUser()?.email;
    const email = this.email.trim().toLowerCase();
    if (!requestedBy || !email) {
      this.error.set('Enter an email address to add an administrator');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.success.set('');
    this.http.post<AdminUser>('/api/users/admins', { email, requestedBy }).subscribe({
      next: () => {
        this.email = '';
        this.success.set('Administrator access updated');
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (response) => {
        this.error.set(response.error?.error ?? 'Unable to add administrator');
        this.saving.set(false);
      }
    });
  }

  removeAdmin(admin: AdminUser): void {
    const requestedBy = this.auth.currentUser()?.email;
    if (!requestedBy || admin.isSuperAdmin) return;

    this.removingEmail.set(admin.email);
    this.error.set('');
    this.success.set('');
    this.http.delete(`/api/users/admins/${encodeURIComponent(admin.email)}`, { body: { requestedBy } }).subscribe({
      next: () => {
        this.success.set('Administrator access removed');
        this.removingEmail.set('');
        this.loadAdmins();
      },
      error: (response) => {
        this.error.set(response.error?.error ?? 'Unable to remove administrator');
        this.removingEmail.set('');
      }
    });
  }
}