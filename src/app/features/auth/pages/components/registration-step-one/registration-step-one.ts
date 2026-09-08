import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registration-step-one',
  styleUrl: './registration-step-one.scss',
  templateUrl: './registration-step-one.html',
})
export class RegistrationStepOne {
  readonly form = input.required<FormGroup>();

  readonly next = output<void>();

    // Проверка, был ли поле тронуто и содержит ли ошибку
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form().get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  // Проверка, нужно ли показывать сообщение об ошибке
  shouldShowError(fieldName: string): boolean {
    const control = this.form().get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  // Проверка, заполнена ли форма полностью и валидна
  isFormValid(): boolean {
    return this.form().valid;
  }

  onSubmit(): void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.next.emit();
  }
}
