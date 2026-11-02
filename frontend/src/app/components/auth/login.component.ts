import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private msal   = inject(MsalService);
  private auth   = inject(AuthService);
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    // If the user is already logged in, skip the login page
    const accounts = this.msal.instance.getAllAccounts();
    if (accounts.length) {
      await this.auth.hydrateFromMsal(accounts[0]);
      this.router.navigate(['/']);
    }
  }

  signIn(): void {
    this.msal.loginRedirect({ scopes: ['openid', 'profile', 'User.Read'] });
  }
}
