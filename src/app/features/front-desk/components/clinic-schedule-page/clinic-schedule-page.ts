import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ScheduleDay,
  ScheduleSlotState,
  UnavailablePeriod,
  WorkHoursDay,
} from '../../models/clinic-schedule.model';

const DAYS: readonly ScheduleDay[] = [
  { id: 'sun', label: 'الأحد' },
  { id: 'mon', label: 'الاثنين' },
  { id: 'tue', label: 'الثلاثاء' },
  { id: 'wed', label: 'الأربعاء' },
  { id: 'thu', label: 'الخميس' },
];

const TIMES: readonly string[] = ['08:00', '09:00', '10:00', '11:00', '12:00'];

const SCHEDULE: Readonly<Record<string, ScheduleSlotState>> = {
  'sun-08:00': 'booked',
  'sun-10:00': 'booked',
  'mon-09:00': 'booked',
  'mon-12:00': 'blocked',
  'tue-08:00': 'booked',
  'tue-10:00': 'blocked',
  'tue-11:00': 'booked',
  'wed-09:00': 'booked',
  'wed-12:00': 'booked',
  'thu-10:00': 'booked',
};

const WORK_HOURS_DAYS: readonly WorkHoursDay[] = [
  { id: 'sun', label: 'الأحد', hoursText: '08:00 — 14:00 · مدة الموعد 30 دقيقة' },
  { id: 'mon', label: 'الاثنين', hoursText: '08:00 — 14:00 · مدة الموعد 30 دقيقة' },
  { id: 'fri', label: 'الجمعة', hoursText: 'العيادة مغلقة' },
  { id: 'sat', label: 'السبت', hoursText: 'العيادة مغلقة' },
];

const UNAVAILABLE_PERIODS: readonly UnavailablePeriod[] = [
  { id: 'u1', title: 'غياب الطبيب — العظمية', dateRange: '28 تموز · 08:00 — 14:00' },
  { id: 'u2', title: 'إغلاق عيادة — الأسنان', dateRange: '29 — 31 تموز' },
];

@Component({
  imports: [],
  selector: 'app-clinic-schedule-page',
  styleUrl: './clinic-schedule-page.scss',
  templateUrl: './clinic-schedule-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicSchedulePage {
  readonly clinicName = 'جدول عيادة الباطنية';

  readonly days = DAYS;
  readonly times = TIMES;
  readonly workHoursDays = WORK_HOURS_DAYS;
  readonly unavailablePeriods = UNAVAILABLE_PERIODS;

  private readonly selectedWorkHoursDaySignal = signal(WORK_HOURS_DAYS[1].id);
  readonly selectedWorkHoursDay = this.selectedWorkHoursDaySignal.asReadonly();

  readonly selectedWorkHours = computed(
    () => this.workHoursDays.find((day) => day.id === this.selectedWorkHoursDay())?.hoursText ?? '',
  );

  selectWorkHoursDay(id: string): void {
    this.selectedWorkHoursDaySignal.set(id);
  }

  slotState(dayId: string, time: string): ScheduleSlotState | null {
    return SCHEDULE[`${dayId}-${time}`] ?? null;
  }

  onEditWorkHours(): void {
    // TODO: فتح نموذج تعديل ساعات العمل القياسية
  }

  onAddUnavailablePeriod(): void {
    // TODO: إضافة فترة عدم توفر جديدة
  }
}
