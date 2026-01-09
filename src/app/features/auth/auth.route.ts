import {LoginComponent} from './login/login.component';
import {Routes} from '@angular/router';
import {GuestGuard} from '../../core/guards/guest.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [GuestGuard]
  }
];
