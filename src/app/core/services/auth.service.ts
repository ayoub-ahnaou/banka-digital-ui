import {computed, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from '../models/login.response.model';
import {tap} from 'rxjs';
import {TokenService} from './token.service';

export interface AuthPrincipal {
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://134.122.51.130:80/api/auth'; // TODO: Replace with environment variable
  private _principal = signal<AuthPrincipal | null>(null);

  principal = computed(() => this._principal());
  isLoggedIn = computed(() => !!this._principal());

  private constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  register(data: {
    username: string,
    email: string,
    password: string
  }) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(
          res => {
            this.tokenService.save(res.data.accessToken, res.data.role);
            this._principal.set({
              username: res.data.username,
              email: res.data.email,
              role: res.data.role
            });
            console.log(res);
          }
        ));
  }

  logout() {
    this._principal.set(null);
    this.tokenService.clear();
  }

  getUserRole(): string | null {
    return this.tokenService.getRole();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
