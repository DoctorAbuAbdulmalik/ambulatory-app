export type ScheduleSlotState = 'booked' | 'blocked';

export interface ScheduleDay {
  id: string;
  label: string;
}

export interface UnavailablePeriod {
  id: string;
  title: string;
  dateRange: string;
}

export interface WorkHoursDay {
  id: string;
  label: string;
  hoursText: string;
}
