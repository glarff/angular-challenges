import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorModalComponent implements OnInit {
  constructor(private errorService: ErrorHandlerService) {}

  errorMessage: WritableSignal<string> = this.errorService.errorMessage;

  ngOnInit(): void {}

  closeModal(): void {
    this.errorService.clearError();
  }
}
