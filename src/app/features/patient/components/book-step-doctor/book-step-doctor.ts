import { Component, input, output } from '@angular/core';
import { BookingDoctor } from '../../models/booking.models';

@Component({
  imports: [],
  selector: 'app-book-step-doctor',
  styleUrl: './book-step-doctor.scss',
  templateUrl: './book-step-doctor.html',
  standalone: true,
})
export class BookStepDoctor {
  readonly doctors = input.required<readonly BookingDoctor[]>();
  readonly selectedId = input<string | null>(null);

  readonly select = output<string>();
}
