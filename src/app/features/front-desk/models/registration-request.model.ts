export type RegistrationRequestStatus = 'pending-review' | 'mismatch' | 'verified' | 'blocked';

export interface RegistrationRequestRow {
  id: string;
  status: RegistrationRequestStatus;
}

export const REGISTRATION_REQUEST_STATUS_LABELS: Record<RegistrationRequestStatus, string> = {
  'pending-review': 'قيد المراجعة',
  mismatch: 'عدم تطابق',
  verified: 'موثّق',
  blocked: 'محجوب',
};
