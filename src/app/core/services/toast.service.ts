import {Injectable, signal} from '@angular/core';

export type ToastType = 'success' | 'error';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast = signal<Toast | null>(null);

  showSuccess(message: string) {
    this.show({message, type: 'success'});
  }

  showError(message: string) {
    this.show({message, type: 'error'});
  }

  private show(toast: Toast) {
    this.toast.set(toast);

    setTimeout(() => {
      this.toast.set(null);
    }, 4000);
  }
}
