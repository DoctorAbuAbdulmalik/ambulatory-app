import { Component, input, output } from '@angular/core';
import { BookingHospital } from '../../models/booking.models';

@Component({
  imports: [],
  selector: 'app-book-step-hospital',
  styleUrl: './book-step-hospital.scss',
  templateUrl: './book-step-hospital.html',
  standalone: true,
})
export class BookStepHospital {
  readonly hospitals = input.required<readonly BookingHospital[]>();
  readonly selectedId = input<string | null>(null);

  readonly select = output<string>();
}
