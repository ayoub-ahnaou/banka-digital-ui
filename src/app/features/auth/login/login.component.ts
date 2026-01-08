import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth.principal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    console.log("LoginComponent initialized");
  }

  login() {
    console.log(this.auth);
    this.auth.login({id: 1, username: "Ayoub"});
    this.router.navigate(["/dashboard"]);
  }
}
