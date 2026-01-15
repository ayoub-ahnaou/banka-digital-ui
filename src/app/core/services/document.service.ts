import {inject, Injectable} from '@angular/core';
import {ApiResponse} from '../models/api.response.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http: HttpClient = inject(HttpClient);
  private API_URL = 'http://134.122.51.130:80/api'; // TODO: Replace with environment variable

  uploadDocument(operationId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file); // MUST match backend field name

    return this.http.post<ApiResponse<any>>(
      `${this.API_URL}/documents/upload/1`,
      formData
    );
  }
}
