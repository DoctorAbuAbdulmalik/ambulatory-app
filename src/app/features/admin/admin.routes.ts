import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/admin-shell/admin-shell').then((m) => m.AdminShell),
  },
];
