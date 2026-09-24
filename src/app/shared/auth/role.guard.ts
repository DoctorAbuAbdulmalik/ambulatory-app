import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ROLE_HOME_ROUTES, UserRole } from './user-role.model';

/**
 * Allows the route only for the given roles.
 * Guests go to the login page, logged-in users without access go to their own home page.
 */
export function roleGuard(...allowed: UserRole[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.hasRole(allowed)) {
      return true;
    }

    const role = auth.role();
    return router.parseUrl(role ? ROLE_HOME_ROUTES[role] : '/auth/login');
  };
}
