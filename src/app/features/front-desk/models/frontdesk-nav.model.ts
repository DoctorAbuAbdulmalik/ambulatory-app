export type FrontdeskViewId =
  | 'registration-requests'
  | 'appointments'
  | 'clinic-schedules'
  | 'clinics';

export interface FrontdeskNavItem {
  id: FrontdeskViewId;
  label: string;
}
