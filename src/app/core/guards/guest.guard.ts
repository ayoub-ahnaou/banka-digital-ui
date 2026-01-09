import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
import {NavigationService} from '../services/navigation.service';

export const GuestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const nav = inject(NavigationService);

  if (auth.isAuthenticated()) {
    const previousUrl = nav.getPreviousUrl();

    if (previousUrl)
      router.navigate([previousUrl]).catch(error => console.error('Navigation error:', error));
    else
      router.navigate(["/"]).catch(error => console.error('Navigation error:', error));
  }

  return true;
};
