export type ReceptionAccountStatus = 'active' | 'disabled';

export type ReceptionPermission = 'registration' | 'appointments' | 'schedules';

export interface ReceptionAccountRow {
  id: string;
  permissions: readonly ReceptionPermission[];
  status: ReceptionAccountStatus;
}

export const RECEPTION_ACCOUNT_STATUS_LABELS: Record<ReceptionAccountStatus, string> = {
  active: 'مفعّل',
  disabled: 'معطّل',
};

export const RECEPTION_PERMISSION_LABELS: Record<ReceptionPermission, string> = {
  registration: 'التسجيل',
  appointments: 'المواعيد',
  schedules: 'الجداول',
};
