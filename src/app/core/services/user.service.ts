import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {map, Observable} from 'rxjs';
import {ApiResponse} from '../models/api.response.model';

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
}
