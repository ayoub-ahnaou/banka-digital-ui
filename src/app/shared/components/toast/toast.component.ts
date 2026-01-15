import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  template: `
    @if (toastService.toast()) {
      <div
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50
               px-6 py-3 rounded-lg text-sm font-medium shadow-lg
               transition-all duration-300 text-white"
        [ngClass]="{
          'bg-green-600': toastService.toast()?.type === 'success',
          'bg-red-600': toastService.toast()?.type === 'error'
        }"
      >
        {{ toastService.toast()?.message }}
      </div>
    }
  `
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
