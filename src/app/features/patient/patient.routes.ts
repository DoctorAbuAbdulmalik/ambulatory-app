import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/patient-account/patient-account').then((m) => m.PatientAccount),
  },
];
