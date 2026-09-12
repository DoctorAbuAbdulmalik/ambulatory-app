import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/pages/landing-page/landing-page').then(
        (m) => m.LandingPage
      ),
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'patient',
    loadChildren: () => import('./features/patient/patient.routes').then((m) => m.PATIENT_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
