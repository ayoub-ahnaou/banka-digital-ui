import {Component, OnInit, signal} from '@angular/core';
import {OperationService} from '../../../core/services/operation.service';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {Operation} from '../../../core/models/operation.model';
import {ApiResponse} from '../../../core/models/api.response.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-operation',
  imports: [NgClass, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './operation.component.html',
})
export class OperationComponent implements OnInit {
  constructor(
    private operationService: OperationService
  ) {
  }

  operations = signal<Operation[]>([]);
  loading = signal<boolean>(false);
  error = signal<String | null>(null);

  ngOnInit() {
    this.loading.set(true);

    this.operationService.getOperations()
      .subscribe({
        next: (res: ApiResponse<Operation[]>) => {
          this.operations.set(res.data);
          console.log(res)
          this.loading.set(false);
        },
        error: err => {
          console.error(err);
          this.loading.set(false);
        }
      })
  }
}
