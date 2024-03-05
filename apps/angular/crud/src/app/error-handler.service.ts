import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMessage = signal<string>('');

  setError(message: string): void {
    console.log('setting error to ', message);
    this.errorMessage.set(message);
  }

  clearError(): void {
    console.info('clearing error');
    this.errorMessage.set('');
  }
}
