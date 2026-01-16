import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { OperationService } from '../../../core/services/operation.service';
import { Operation } from '../../../core/models/operation.model';
import { ApiResponse } from '../../../core/models/api.response.model';
import { VerifyOperationDialogComponent } from './verify-operation-dialog/verify-operation-dialog.component';

@Component({
    selector: 'app-agent-operations',
    imports: [
        DatePipe,
        DecimalPipe,
        NgClass,
        VerifyOperationDialogComponent
    ],
    template: `
    <div class="h-full">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">Pending Operations</h2>
      </div>

      @if (loading()) {
        <div class="text-gray-500 text-sm">
          Loading operations...
        </div>
      }

      @if (error()) {
        <div class="text-red-600 text-sm">
          {{ error() }}
        </div>
      }

      @if (!loading() && !error() && operations().length === 0) {
        <div class="text-gray-500 text-sm bg-gray-50 rounded-lg p-4">
          No pending operations found.
        </div>
      }

      @if (operations().length > 0) {
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th class="py-3 px-4">ID</th>
              <th class="py-3 px-4">Type</th>
              <th class="py-3 px-4">From Account</th>
              <th class="py-3 px-4">Amount</th>
              <th class="py-3 px-4">Created At</th>
              <th class="py-3 px-4 text-right">Action</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (op of operations(); track op.id) {
                <tr class="hover:bg-gray-50 transition">
                  <td class="py-3 px-4 font-mono text-xs text-gray-500">{{ op.id }}</td>
                  <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {{ op.type }}
                    </span>
                  </td>
                  <td class="py-3 px-4 font-medium text-gray-700">{{ op.accountSourceNumber }}</td>
                  <td class="py-3 px-4 font-bold text-gray-900">
                    {{ op.amount | number:'1.2-2' }} MAD
                  </td>
                  <td class="py-3 px-4 text-gray-500 text-xs">
                    {{ op.createdAt | date:'MMM d, y, h:mm a' }}
                  </td>
                  <td class="py-3 px-4 text-right">
                    <button
                      (click)="verifyOperation(op)"
                      class="text-xs bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition">
                      Verify
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      @if (selectedOperation()) {
        <app-verify-operation-dialog
          [operation]="selectedOperation()!"
          (close)="closeDialog()"
          (decided)="onOperationDecided()"
        ></app-verify-operation-dialog>
      }
    </div>
  `
})
export class AgentOperationsComponent implements OnInit {
    private operationService = inject(OperationService);

    operations = signal<Operation[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    selectedOperation = signal<Operation | null>(null);

    ngOnInit() {
        this.loadOperations();
    }

    loadOperations() {
        this.loading.set(true);
        this.operationService.getAllOperations().subscribe({
            next: (res: ApiResponse<Operation[]>) => {
                // Filter only pending operations client-side if backend returns all
                // Adjust logic if backend endpoint specifically returns pending
                const pending = res.data.filter(op => op.status === 'PENDING');
                this.operations.set(pending);
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Failed to load operations');
                this.loading.set(false);
            }
        });
    }

    verifyOperation(op: Operation) {
        this.selectedOperation.set(op);
    }

    closeDialog() {
        this.selectedOperation.set(null);
    }

    onOperationDecided() {
        this.closeDialog();
        this.loadOperations(); // Refresh list
    }
}
