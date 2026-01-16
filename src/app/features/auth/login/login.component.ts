import {Component, signal} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {Field, form, required} from '@angular/forms/signals';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Field],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  error = signal<string>("");
  loading = signal<boolean>(false);

  loginModel = signal({username: "", password: ""});
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
    required(schemaPath.password, {message: 'Password is required'});
  });

  login(event: Event) {
    event.preventDefault();

    if (this.loginForm.username().value() && this.loginForm.password().value()) {
      this.loading.set(true);
      this.auth.login({
        username: this.loginForm.username().value(),
        password: this.loginForm.password().value()
      })
        .subscribe({
          next: () => {
            this.loading.set(false);
            switch (this.auth.getUserRole()) {
              case 'CLIENT':
                this.router.navigate(['/dashboard']).catch(error => console.log("Navigation error"));
                break;
              case 'BANK_AGENT':
                this.router.navigate(['/agent/dashboard']).catch(error => console.log("Navigation error"));
                break;
              // TODO: Add ADMIN role navigation
            }
          },
          error: error => {
            console.log(error);

            this.loading.set(false);
            this.error.set(error.error.errors[0] || error.error.message);
          }
        });
    }
  }
}
