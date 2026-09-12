import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/registration/registration').then((m) => m.Registration),
    children: [
      {
        path: '',
        redirectTo: 'step1',
        pathMatch: 'full',
      },
      {
        path: 'step1',
        loadComponent: () =>
          import('./pages/components/registration-step-one/registration-step-one').then(
            (m) => m.RegistrationStepOne,
          ),
      },
      {
        path: 'step2',
        loadComponent: () =>
          import('./pages/components/registration-step-two/registration-step-two').then(
            (m) => m.RegistrationStepTwo,
          ),
      },
      {
        path: 'step3',
        loadComponent: () =>
          import('./pages/components/registration-step-three/registration-step-three').then(
            (m) => m.RegistrationStepThree,
          ),
      },
    ],
  },
];
