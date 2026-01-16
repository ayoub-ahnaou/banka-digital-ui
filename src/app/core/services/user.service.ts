import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private API_URL = 'http://134.122.51.130:80/api'; // TODO: Replace with environment variable

  getProfile(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/accounts/account`)
      .pipe(
        map(res => res.data)
      );
  }

  // Admin Methods
  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.API_URL}/admin/users`)
      .pipe(map(res => res.data));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/users/${id}`);
  }

  activateUser(id: number) {
    return this.http.patch(`${this.API_URL}/admin/users/${id}/activate`, {});
  }

  deactivateUser(id: number) {
    return this.http.patch(`${this.API_URL}/admin/users/${id}/deactivate`, {});
  }

  promoteUser(id: number) {
    return this.http.patch(`${this.API_URL}/admin/users/${id}/promote`, {});
  }
}
