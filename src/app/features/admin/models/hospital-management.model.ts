export type HospitalStatus = 'locked' | 'disabled';

export interface HospitalRow {
  id: string;
  status: HospitalStatus;
}

export const HOSPITAL_STATUS_LABELS: Record<HospitalStatus, string> = {
  locked: 'مقفل',
  disabled: 'معطل',
};
