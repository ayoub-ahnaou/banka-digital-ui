import {computed, Injectable, signal} from '@angular/core';

export interface AuthPrincipal {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _principal = signal<AuthPrincipal | null>(null);

  // read only variable
  principal = computed(() => this._principal());
  isAuthenticated = computed(() => !!this._principal());

  login(principal: AuthPrincipal) {
    this._principal.set(principal);
  }

  logout() {
    this._principal.set(null);
  }
}
