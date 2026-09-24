export type FrontdeskViewId =
  | 'registration-requests'
  | 'appointments'
  | 'clinic-schedules'
  | 'clinics';

export interface FrontdeskNavItem {
  id: FrontdeskViewId;
  label: string;
}

export const FRONTDESK_NAV_ITEMS: readonly FrontdeskNavItem[] = [
  { id: 'registration-requests', label: 'طلبات التسجيل' },
  { id: 'appointments', label: 'المواعيد' },
  { id: 'clinic-schedules', label: 'جداول العيادات' },
  { id: 'clinics', label: 'العيادات' },
];
