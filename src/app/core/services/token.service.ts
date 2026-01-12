import {Injectable} from '@angular/core';

const TOKEN_KEY = "login_session_token";
const ROLE_KEY = "role_user";

@Injectable({providedIn: 'root'})
export class TokenService {

  save(token: string, role: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(ROLE_KEY);
  }

  clear() {
    localStorage.setItem(TOKEN_KEY, "");
    localStorage.setItem(ROLE_KEY, "");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
