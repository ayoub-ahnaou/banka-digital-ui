import {Component, OnInit, signal} from '@angular/core';
import {OperationService} from '../../../core/services/operation.service';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {Operation} from '../../../core/models/operation.model';
import {ApiResponse} from '../../../core/models/api.response.model';
import {RouterLink} from '@angular/router';
import {DocumentService} from '../../../core/services/document.service';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-operation',
  imports: [NgClass, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './operation.component.html',
})
export class OperationComponent implements OnInit {

  operations = signal<Operation[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Modal state
  showModal = signal<boolean>(false);
  selectedOperation = signal<Operation | null>(null);
  selectedFile = signal<File | null>(null);
  uploading = signal(false);

  constructor(
    private operationService: OperationService,
    private documentService: DocumentService,
    private toastService: ToastService
    ) {}

  ngOnInit() {
    this.loading.set(true);

    this.operationService.getOperations().subscribe({
      next: (res: ApiResponse<Operation[]>) => {
        this.operations.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load operations');
      }
    });
  }

  // 🔥 Open modal ONLY if pending
  onOperationClick(op: Operation) {
    console.log(op);
    if (op.status !== 'PENDING') return;

    this.selectedOperation.set(op);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedOperation.set(null);
    this.selectedFile.set(null);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  submitFile() {
    const operation = this.selectedOperation();
    const file = this.selectedFile();

    if (!operation || !file) return;

    this.uploading.set(true);

    this.documentService
      .uploadDocument(operation.id, file)
      .subscribe({
        next: res => {
          this.toastService.showSuccess(res.message);
          this.closeModal();
          this.uploading.set(false);
        },
        error: err => {
          console.error(err);
          this.error.set(err.message || 'File upload failed');
          this.uploading.set(false);
        }
      });
  }
}

