export type UserRole = 'PATIENT' | 'EDITOR' | 'ADMIN';

/** Page each role lands on after logging in. */
export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  PATIENT: '/patient',
  EDITOR: '/frontdesk',
  ADMIN: '/admin',
};
