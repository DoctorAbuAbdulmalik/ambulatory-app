import { Component, inject, input, output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerService } from '../../../services/timer.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-registration-step-two',
  styleUrl: './registration-step-two.scss',
  templateUrl: './registration-step-two.html',
})
export class RegistrationStepTwo implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly timerService = inject(TimerService);

  readonly form = input.required<FormGroup>();
  readonly next = output<void>();
  readonly back = output<void>();

  // Используем сервис
  timerDisplay = this.timerService.timerDisplay;
  isResendDisabled = this.timerService.isTimerRunning;

  ngOnInit(): void {
    this.timerService.startTimer(180);
  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
  }

  onNext(): void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }
    this.next.emit();
  }

  onBack(): void {
    this.back.emit();
  }

  onResendCode(): void {
    if (this.timerService.isTimerExpired()) {
      console.log('Код отправлен повторно');
      this.timerService.startTimer(180);
      // Здесь API запрос на повторную отправку
    }
  }
}
