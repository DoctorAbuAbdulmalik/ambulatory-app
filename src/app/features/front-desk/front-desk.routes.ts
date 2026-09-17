import { Routes } from '@angular/router';

export const FRONTDESK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/frontdesk-shell/frontdesk-shell').then((m) => m.FrontdeskShell),
  },
];
