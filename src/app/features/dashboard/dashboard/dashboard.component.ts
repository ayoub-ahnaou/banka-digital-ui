import {Component, computed} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {UserStore} from '../../../core/state/UserStore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private userStore: UserStore) {
  }

  user = computed(() => this.userStore.user());
}
