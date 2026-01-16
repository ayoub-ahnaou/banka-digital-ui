import {Component, signal} from '@angular/core';
import {OperationService} from '../../../core/services/operation.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-make-operation',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './make.operation.html',
})
export class MakeOperationComponent {

  type = signal<'DEPOSIT' | 'WITHDRAW' | 'TRANSFER'>('DEPOSIT');
  amount = 0;
  destinationAccountId = '';

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private operationService: OperationService,
    private router: Router
  ) {
  }

  setType(type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER') {
    this.type.set(type);
    this.error.set(null);
  }

  submit() {
    this.error.set(null);

    if (this.amount <= 0) {
      this.error.set('Amount must be greater than zero');
      return;
    }

    if (this.type() === 'TRANSFER' && !this.destinationAccountId) {
      this.error.set('Destination account is required');
      return;
    }

    this.loading.set(true);

    const payload: any = {
      type: this.type(),
      amount: this.amount,
      destinationAccountId: this.destinationAccountId || null
    };

    this.operationService.makeOperation(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(["/operations"]).catch((error: Error) => {
          console.log("Navigation error:", error)
        });
      },
      error: err => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Operation failed');
      }
    });
  }
}
