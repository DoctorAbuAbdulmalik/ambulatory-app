import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  APPOINTMENT_ATTENDANCE_LABELS,
  APPOINTMENT_QUEUE_STATUS_LABELS,
  AppointmentQueueRow,
} from '../../models/appointment-queue.model';

const ROWS: readonly AppointmentQueueRow[] = [
  { id: 'a1', time: '08.30', attendance: 'attended', status: 'booked' },
  { id: 'a2', time: '09.00', attendance: 'not-arrived', status: 'booked' },
  { id: 'a3', time: '10.00', attendance: 'attended', status: 'booked' },
  { id: 'a4', time: '8.30', attendance: 'not-arrived', status: 'booked' },
  { id: 'a5', time: '12.00', attendance: 'none', status: 'cancelled' },
];

@Component({
  imports: [],
  selector: 'app-patient-appointments-page',
  styleUrl: './patient-appointments-page.scss',
  templateUrl: './patient-appointments-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientAppointmentsPage {
  readonly rows = ROWS;
  readonly attendanceLabels = APPOINTMENT_ATTENDANCE_LABELS;
  readonly statusLabels = APPOINTMENT_QUEUE_STATUS_LABELS;

  resetFilters(): void {
    // TODO: إعادة ضبط فلاتر المواعيد
  }

  onEmergencyCase(): void {
    // TODO: تسجيل حالة طارئة
  }

  onDoctorAbsence(): void {
    // TODO: تسجيل غياب طبيب
  }

  onCloseClinic(): void {
    // TODO: إغلاق عيادة مؤقتاً
  }

  onTransfer(row: AppointmentQueueRow): void {
    // TODO: نقل الموعد إلى عيادة/وقت آخر
  }

  onComplete(row: AppointmentQueueRow): void {
    // TODO: تأكيد حضور المريض وإنهاء الموعد
  }

  onCancel(row: AppointmentQueueRow): void {
    // TODO: إلغاء الموعد
  }
}
