import { Component, inject, input, output, OnInit, OnDestroy } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TimerService } from '../../../services/timer.service';
import { fieldErrorMessage, isFieldInvalid } from '../../../../../shared/forms/field-helpers';
import { RegistrationStepTwoModel } from '../../../models/registration.models';

@Component({
  imports: [FormField],
  selector: 'app-registration-step-two',
  styleUrl: './registration-step-two.scss',
  templateUrl: './registration-step-two.html',
  standalone: true,
})
export class RegistrationStepTwo implements OnInit, OnDestroy {
  private readonly timerService = inject(TimerService);

  readonly form = input.required<FieldTree<RegistrationStepTwoModel>>();
  readonly next = output<void>();
  readonly back = output<void>();

  // Используем сервис
  timerDisplay = this.timerService.timerDisplay;
  isResendDisabled = this.timerService.isTimerRunning;

  readonly isFieldInvalid = isFieldInvalid;
  readonly fieldErrorMessage = fieldErrorMessage;

  ngOnInit(): void {
    this.timerService.startTimer(180);
  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
  }

  onConfirmCode(): void {
    const f = this.form();
    const digits = [
      f.confirmationCodeDigit_0,
      f.confirmationCodeDigit_1,
      f.confirmationCodeDigit_2,
      f.confirmationCodeDigit_3,
      f.confirmationCodeDigit_4,
      f.confirmationCodeDigit_5,
    ];

    const isCodeValid = digits.every((digit) => digit().valid());
    if (!isCodeValid) {
      digits.forEach((digit) => digit().markAsTouched());
      return;
    }

    this.next.emit();
  }

  onNext(event: Event): void {
    event.preventDefault();

    const state = this.form()();
    if (state.invalid()) {
      state.markAsTouched();
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
