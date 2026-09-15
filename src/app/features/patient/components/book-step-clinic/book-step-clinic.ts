import { Component, input, output } from '@angular/core';
import { BookingClinic } from '../../models/booking.models';

@Component({
  imports: [],
  selector: 'app-book-step-clinic',
  styleUrl: './book-step-clinic.scss',
  templateUrl: './book-step-clinic.html',
  standalone: true,
})
export class BookStepClinic {
  readonly clinics = input.required<readonly BookingClinic[]>();
  readonly selectedId = input<string | null>(null);

  readonly select = output<string>();
}
