import { FrontdeskViewId } from '../../front-desk/models/frontdesk-nav.model';

export type AdminToolViewId =
  | 'hospitals'
  | 'reception-accounts'
  | 'site-news'
  | 'critical-alerts';

export type AdminViewId = FrontdeskViewId | AdminToolViewId;

export interface AdminNavItem {
  id: AdminViewId;
  label: string;
}

export const ADMIN_TOOL_NAV_ITEMS: readonly AdminNavItem[] = [
  { id: 'hospitals', label: 'المستشفيات' },
  { id: 'reception-accounts', label: 'حسابات الاستقبال' },
  { id: 'site-news', label: 'أخبار الموقع' },
  { id: 'critical-alerts', label: 'التنبيهات الحرجة' },
];
