import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Operation } from '../../../../core/models/operation.model';
import { DocumentService } from '../../../../core/services/document.service';
import { OperationService } from '../../../../core/services/operation.service';
import { Document } from '../../../../core/models/document.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
    selector: 'app-verify-operation-dialog',
    imports: [
        DatePipe,
        DecimalPipe
    ],
    template: `
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        <!-- Header -->
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Verify Operation</h3>
          <button (click)="close.emit()" class="text-gray-400 hover:text-gray-600">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto flex-1">

          <!-- Operation Details -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Type</p>
              <p class="font-semibold">{{ operation.type }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Amount</p>
              <p class="font-bold text-gray-900">{{ operation.amount | number:'1.2-2' }} MAD</p>
            </div>
            <div>
              <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Account</p>
              <p class="font-mono">{{ operation.accountSourceNumber }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Date</p>
              <p>{{ operation.createdAt | date:'medium' }}</p>
            </div>
          </div>

          <!-- Document Viewer -->
          <h4 class="font-semibold mb-3">Supporting Documents</h4>

          @if (loadingDoc()) {
            <div class="h-40 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
              <span class="text-gray-500 text-sm">Loading document...</span>
            </div>
          }

          @if (!loadingDoc() && !document()) {
            <div class="h-40 flex items-center justify-center bg-red-50 rounded border border-red-100 text-red-600 text-sm">
              No document found for this operation.
            </div>
          }

          @if (document()) {
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                    <i class="fa-solid fa-file-lines"></i>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-900">{{ document()?.fileName }}</p>
                    <p class="text-xs text-gray-500">{{ document()?.fileType }} • {{ document()?.createdAt | date }}</p>
                  </div>
                </div>
                <!-- Since we don't have a direct download URL yet, we'll just show metadata or maybe an action if backend supports it -->
                 <a [href]="'http://134.122.51.130:80/api/documents/download/' + document()?.id" target="_blank"
                   class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Download
                </a>
              </div>
            </div>
          }

        </div>

        <!-- Footer Actions -->
        <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <button
            (click)="reject()"
            [disabled]="processing()"
            class="px-4 py-2 text-sm text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 font-medium disabled:opacity-50">
            Reject
          </button>
          <button
            (click)="approve()"
            [disabled]="processing()"
            class="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 font-medium disabled:opacity-50 shadow-sm">
            Approve Operation
          </button>
        </div>

      </div>
    </div>
  `
})
export class VerifyOperationDialogComponent implements OnInit {
    @Input({ required: true }) operation!: Operation;
    @Output() close = new EventEmitter<void>();
    @Output() decided = new EventEmitter<void>();

    private documentService = inject(DocumentService);
    private operationService = inject(OperationService);
    private toast = inject(ToastService);

    document = signal<Document | null>(null); // Simplified to single doc for now as per requirement
    loadingDoc = signal(false);
    processing = signal(false);

    ngOnInit() {
        this.loadDocument();
    }

    loadDocument() {
        this.loadingDoc.set(true);
        // Cast ID to number if needed, assuming API expects number
        this.documentService.getDocumentsByOperationForAgent(+this.operation.id).subscribe({
            next: (res) => {
                // Assuming the latest document is relevant or there is only one
                if (res.data && res.data.length > 0) {
                    this.document.set(res.data[0]);
                }
                this.loadingDoc.set(false);
            },
            error: () => this.loadingDoc.set(false)
        });
    }

    approve() {
        if (!confirm('Are you sure you want to approve this operation?')) return;

        this.processing.set(true);
        this.operationService.approveOperation(this.operation.id).subscribe({
            next: () => {
                this.toast.showSuccess('Operation approved successfully');
                this.processing.set(false);
                this.decided.emit();
            },
            error: (err) => {
                this.toast.showError(err.error?.message || 'Failed to approve operation');
                this.processing.set(false);
            }
        });
    }

    reject() {
        if (!confirm('Are you sure you want to REJECT this operation?')) return;

        this.processing.set(true);
        this.operationService.rejectOperation(this.operation.id).subscribe({
            next: () => {
                this.toast.showInfo('Operation rejected');
                this.processing.set(false);
                this.decided.emit();
            },
            error: (err) => {
                this.toast.showError(err.error?.message || 'Failed to reject operation');
                this.processing.set(false);
            }
        });
    }
}
