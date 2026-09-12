import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { fieldErrorMessage, isFieldInvalid } from '../../../../../shared/forms/field-helpers';
import { RegistrationStepOneModel } from '../../../models/registration.models';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-registration-step-one',
  styleUrl: './registration-step-one.scss',
  templateUrl: './registration-step-one.html',
  standalone: true,
})
export class RegistrationStepOne {
  form = input.required<FieldTree<RegistrationStepOneModel>>();

  readonly next = output<void>();

  readonly isFieldInvalid = isFieldInvalid;
  readonly fieldErrorMessage = fieldErrorMessage;

  isFormValid(): boolean {
    return this.form()().valid();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const state = this.form()();
    if (state.invalid()) {
      state.markAsTouched();
      return;
    }

    this.next.emit();
  }
}
