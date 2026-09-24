import { Routes } from '@angular/router';
import { roleGuard } from './shared/auth/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/pages/landing-page/landing-page').then((m) => m.LandingPage),
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'patient',
    canActivate: [roleGuard('PATIENT')],
    loadChildren: () => import('./features/patient/patient.routes').then((m) => m.PATIENT_ROUTES),
  },
  {
    path: 'frontdesk',
    canActivate: [roleGuard('EDITOR', 'ADMIN')],
    loadChildren: () =>
      import('./features/front-desk/front-desk.routes').then((m) => m.FRONTDESK_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [roleGuard('ADMIN')],
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
