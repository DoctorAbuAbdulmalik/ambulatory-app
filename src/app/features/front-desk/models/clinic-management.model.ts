export type ClinicStatus = 'open' | 'closed';

export interface ClinicRow {
  id: string;
  workHours: string;
  duration: string;
  status: ClinicStatus;
}

export const CLINIC_STATUS_LABELS: Record<ClinicStatus, string> = {
  open: 'مفتوحة',
  closed: 'مغلقة',
};
