import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type AppointmentStatus = 'upcoming' | 'past';

interface Appointment {
  id: string;
  title: string;
  dateTime: string;
  note: string;
  status: AppointmentStatus;
}

const APPOINTMENTS: readonly Appointment[] = [
  {
    id: 'a1',
    title: 'الباطنية — د. سامر',
    dateTime: 'الاثنين 27 · 09:30',
    note: 'يمكن التعديل اليوم',
    status: 'upcoming',
  },
  {
    id: 'a2',
    title: 'العيون — د. طارق',
    dateTime: 'الخميس 30 · 11:00',
    note: 'انتهت مهلة التعديل',
    status: 'upcoming',
  },
  {
    id: 'a3',
    title: 'الجلدية — د. هبة',
    dateTime: '',
    note: 'موعد سابق · حضر',
    status: 'past',
  },
];

@Component({
  imports: [],
  selector: 'app-patient-appointments',
  styleUrl: './patient-appointments.scss',
  templateUrl: './patient-appointments.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientAppointments {
  private readonly activeTabSignal = signal<AppointmentStatus>('upcoming');
  readonly activeTab = this.activeTabSignal.asReadonly();

  readonly isVerified = true;

  readonly appointments = computed(() =>
    APPOINTMENTS.filter((appointment) => appointment.status === this.activeTab()),
  );

  setTab(tab: AppointmentStatus): void {
    this.activeTabSignal.set(tab);
  }
}
