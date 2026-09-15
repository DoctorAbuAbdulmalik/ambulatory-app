import { Component, input, output } from '@angular/core';
import { BookingDay, BookingTimeSlot } from '../../models/booking.models';

@Component({
  imports: [],
  selector: 'app-book-step-datetime',
  styleUrl: './book-step-datetime.scss',
  templateUrl: './book-step-datetime.html',
  standalone: true,
})
export class BookStepDatetime {
  readonly days = input.required<readonly BookingDay[]>();
  readonly timeSlots = input.required<readonly BookingTimeSlot[]>();
  readonly selectedDayId = input<string | null>(null);
  readonly selectedTimeId = input<string | null>(null);

  readonly selectDay = output<string>();
  readonly selectTime = output<string>();
}
