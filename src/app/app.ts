import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './core/services/auth.service';
import {UserStore} from './core/state/UserStore';
import {UserService} from './core/services/user.service';
import {ToastComponent} from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private userStore: UserStore
  ) {
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.userService.getProfile().subscribe({
        next: user => {
          this.userStore.setUser(user);
        },
        error: err => {
          console.error('Failed to fetch user profile on app init', err);
          this.auth.logout();
        }
      })
    }
  }
}
