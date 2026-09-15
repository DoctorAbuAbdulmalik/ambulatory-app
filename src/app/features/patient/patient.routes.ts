import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/patient-account/patient-account').then((m) => m.PatientAccount),
  },
  {
    path: 'book-appointment',
    loadComponent: () =>
      import('./pages/book-appointment/book-appointment').then((m) => m.BookAppointment),
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./pages/patient-appointments/patient-appointments').then(
        (m) => m.PatientAppointments,
      ),
  },
];
