import {Component, signal} from '@angular/core';
import {customError, email, Field, form, pattern, required, schema} from '@angular/forms/signals';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [Field, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  error = signal<string>("");
  loading = signal<boolean>(false);

  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  registerForm = form(this.registerModel, (schema) => {
    required(schema.username, {message: 'Username is required'});
    required(schema.email, {message: 'Email is required'});
    required(schema.password, {message: 'Password is required'});
    required(schema.confirmPassword, {message: 'Confirm Password is required'});

    email(schema.email, {message: "Email is invalid"});
    pattern(
      schema.password,
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      {message: "Password must be at least 8 characters long and contain both letters and numbers"}
    );
  });

  register(event: Event) {
    event.preventDefault();

    if (
      this.registerForm.username().value() &&
      this.registerForm.email().value() &&
      this.registerForm.password().value() &&
      this.registerForm.confirmPassword().value()) {

      this.loading.set(true);
      this.auth.register({
        username: this.registerForm.username().value(),
        email: this.registerForm.email().value(),
        password: this.registerForm.password().value(),
      })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['/login']).catch(() => console.log("Navigation error"));
          },
          error: (e) => {
            console.log(e);

            this.loading.set(false);
            this.error.set(e.error.errors[0] || e.error.message);
          }
        })
    }
  }
}
