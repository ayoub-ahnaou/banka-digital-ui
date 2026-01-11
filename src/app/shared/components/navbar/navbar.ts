import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  constructor(private auth: AuthService, private router: Router) {
  }

  logout() {
    this.router.navigate(['login'], {replaceUrl: true})
      .catch(console.error);
    this.auth.logout();
  }
}
