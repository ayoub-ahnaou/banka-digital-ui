import {CanActivateFn, Router} from '@angular/router';
import {NavigationService} from '../services/navigation.service';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const BankAgentGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const nav = inject(NavigationService);

  if(auth.getUserRole() !== "BANK_AGENT") {
    const previousUrl = nav.getPreviousUrl();

    if (previousUrl)
      router.navigate([previousUrl]).catch(error => console.error('Navigation error:', error));
    else
      router.navigate(["/"]).catch(error => console.error('Navigation error:', error));
  }

  return true;
};
