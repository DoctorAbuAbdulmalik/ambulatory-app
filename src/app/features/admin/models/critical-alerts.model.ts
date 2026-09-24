export type CriticalAlertSeverity = 'critical' | 'warning' | 'info';

export type CriticalAlertStatus = 'active' | 'draft' | 'ended';

export interface CriticalAlert {
  id: string;
  title: string;
  text: string;
  severity: CriticalAlertSeverity;
  /** ISO date, YYYY-MM-DD */
  startDate: string;
  /** ISO date, YYYY-MM-DD */
  endDate: string;
  status: CriticalAlertStatus;
}

export type CriticalAlertDraft = Omit<CriticalAlert, 'id' | 'status'>;

export const CRITICAL_ALERT_SEVERITY_OPTIONS: readonly {
  value: CriticalAlertSeverity;
  label: string;
}[] = [
  { value: 'critical', label: 'حرج' },
  { value: 'warning', label: 'تحذير' },
  { value: 'info', label: 'معلومة' },
];

export const CRITICAL_ALERT_SEVERITY_LABELS: Record<CriticalAlertSeverity, string> = {
  critical: 'حرج',
  warning: 'تحذير',
  info: 'معلومة',
};

export const CRITICAL_ALERT_STATUS_LABELS: Record<CriticalAlertStatus, string> = {
  active: 'نشط',
  draft: 'مسودة',
  ended: 'منتهٍ',
};

const MONTH_NAMES: readonly string[] = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
];

/** Formats a date range like "26 — 31 تموز" or "28 تموز — 3 آب". */
export function formatAlertPeriod(startDate: string, endDate: string): string {
  const [, startMonth, startDay] = startDate.split('-').map(Number);
  const [, endMonth, endDay] = endDate.split('-').map(Number);

  if (!startMonth || !endMonth) {
    return '';
  }

  if (startMonth === endMonth) {
    return `${startDay} — ${endDay} ${MONTH_NAMES[endMonth - 1]}`;
  }

  return `${startDay} ${MONTH_NAMES[startMonth - 1]} — ${endDay} ${MONTH_NAMES[endMonth - 1]}`;
}
