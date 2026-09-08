import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-registration-step-two',
  styleUrl: './registration-step-two.scss',
  templateUrl: './registration-step-two.html',
})
export class RegistrationStepTwo {
    readonly form = input.required<FormGroup>();

  readonly next = output<void>();

  readonly back = output<void>();
}
