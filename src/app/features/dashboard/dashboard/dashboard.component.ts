import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth.principal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private auth: AuthService) {
    console.log("DashboardComponent initialized");
  }

  logout() {
    console.log("Logging out...");
    this.auth.logout();
  }
}
