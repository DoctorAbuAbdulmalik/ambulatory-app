import { Component, inject, input, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { fieldErrorMessage, isFieldInvalid } from '../../../../../shared/forms/field-helpers';
import { RegistrationStepThreeModel } from '../../../models/registration.models';

@Component({
  imports: [FormField],
  selector: 'app-registration-step-three',
  styleUrl: './registration-step-three.scss',
  templateUrl: './registration-step-three.html',
  standalone: true,
})
export class RegistrationStepThree {
  readonly form = input.required<FieldTree<RegistrationStepThreeModel>>();

  readonly next = output<void>();

  private router = inject(Router);

  hasLoginError = true;
  showPassword = false;

  readonly isFieldInvalid = isFieldInvalid;
  readonly fieldErrorMessage = fieldErrorMessage;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(event: Event): void {
    event.preventDefault();

    const state = this.form()();
    if (state.invalid()) {
      state.markAsTouched();
      return;
    }
    // handle login submit
  }

  onCreateNewAccount(): void {
    // navigate to account creation
  }

  onGoToAccount(): void {
    // navigate to account
    this.router.navigate(['/patient']);
  }
}
