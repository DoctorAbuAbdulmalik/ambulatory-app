import { Injectable, computed, signal } from '@angular/core';
import { UserRole } from './user-role.model';

const STORAGE_KEY = 'ambulatory.role';
const ROLES: readonly UserRole[] = ['PATIENT', 'EDITOR', 'ADMIN'];

/**
 * Temporary mock authentication: the role is picked from the password
 * ("EDITOR" / "ADMIN", anything else → PATIENT) and kept in sessionStorage
 * so a page reload does not log the user out.
 * TODO: replace with a real login request once the backend is available.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly roleSignal = signal<UserRole | null>(readStoredRole());
  readonly role = this.roleSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.role() !== null);

  login(password: string): UserRole {
    const role = resolveMockRole(password);
    this.loginAs(role);
    return role;
  }

  loginAs(role: UserRole): void {
    this.roleSignal.set(role);
    writeStoredRole(role);
  }

  logout(): void {
    this.roleSignal.set(null);
    writeStoredRole(null);
  }

  hasRole(allowed: readonly UserRole[]): boolean {
    const role = this.role();
    return role !== null && allowed.includes(role);
  }
}

function resolveMockRole(password: string): UserRole {
  switch (password.trim()) {
    case 'EDITOR':
      return 'EDITOR';
    case 'ADMIN':
      return 'ADMIN';
    default:
      return 'PATIENT';
  }
}

function readStoredRole(): UserRole | null {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return ROLES.includes(value as UserRole) ? (value as UserRole) : null;
  } catch {
    return null;
  }
}

function writeStoredRole(role: UserRole | null): void {
  try {
    if (role) {
      sessionStorage.setItem(STORAGE_KEY, role);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable (private mode, SSR) — keep the role in memory only.
  }
}
