import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-book-step-confirm',
  styleUrl: './book-step-confirm.scss',
  templateUrl: './book-step-confirm.html',
  standalone: true,
})
export class BookStepConfirm {
  readonly hospitalName = input.required<string>();
  readonly clinicAndDoctor = input.required<string>();
  readonly dateAndTime = input.required<string>();
  readonly bookingNumber = input.required<string>();

  readonly print = output<void>();
  readonly goToAppointments = output<void>();
}
