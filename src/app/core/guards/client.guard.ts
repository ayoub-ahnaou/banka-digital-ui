import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavigationService} from '../services/navigation.service';

export const ClientGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const nav = inject(NavigationService);
  if (auth.getUserRole() !== 'CLIENT') {
    const previousUrl = nav.getPreviousUrl();

    if (previousUrl)
      router.navigate([previousUrl]).catch(error => console.error('Navigation error:', error));
    else
      router.navigate(["/"]).catch(error => console.error('Navigation error:', error));
  }

  return true;
};
