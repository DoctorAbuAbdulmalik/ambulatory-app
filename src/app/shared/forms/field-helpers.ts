import type { FieldTree } from '@angular/forms/signals';

export function isFieldInvalid(field: FieldTree<unknown>): boolean {
  const state = field();
  return state.invalid() && state.touched();
}

export function fieldErrorMessage(field: FieldTree<unknown>): string | null {
  const state = field();
  if (!state.touched() || !state.invalid()) return null;
  return state.errors()[0]?.message ?? null;
}
