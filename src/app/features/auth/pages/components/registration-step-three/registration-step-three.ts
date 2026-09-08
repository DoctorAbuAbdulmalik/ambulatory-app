import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-registration-step-three',
  styleUrl: './registration-step-three.scss',
  templateUrl: './registration-step-three.html',
})
export class RegistrationStepThree {
    readonly form = input.required<FormGroup>();

  readonly back = output<void>();

  readonly submitForm = output<void>();
}
