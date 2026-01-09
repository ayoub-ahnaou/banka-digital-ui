import {Injectable} from '@angular/core';

const TOKEN_KEY = "LOGIN_SESSION_TOKEN";

@Injectable({providedIn: 'root'})
export class TokenService {

  save(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  clear() {
    localStorage.setItem(TOKEN_KEY, "");
  }

  isLoggedIn(): boolean {
    return !!this.get();
  }
}
