import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {GuestGuard} from '../../core/guards/guest.guard';

export const REGISTER_ROUTES: Routes = [
  {
    path: "",
    component: RegisterComponent,
    canActivate: [GuestGuard]
  }
];
