import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api.response.model';
import { Operation } from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private http: HttpClient = inject(HttpClient);
  private API_URL = 'http://134.122.51.130:80/api'; // TODO: Replace with environment variable

  getOperations() {
    return this.http.get<ApiResponse<Operation[]>>(`${this.API_URL}/operations/user`);
  }

  makeOperation(payload: {
    type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
    amount: number;
    destinationAccountId?: string | null;
  }) {
    return this.http.post(`${this.API_URL}/operations/${payload.type.toLowerCase()}`,
      payload
    );
  }

  // Agent methods
  getAllOperations() {
    return this.http.get<ApiResponse<Operation[]>>(`${this.API_URL}/operations`);
  }

  approveOperation(id: string) {
    return this.http.patch<ApiResponse<any>>(`${this.API_URL}/operations/${id}/approve`, {});
  }

  rejectOperation(id: string) {
    return this.http.patch<ApiResponse<any>>(`${this.API_URL}/operations/${id}/reject`, {});
  }
}
