export type AppointmentAttendance = 'attended' | 'not-arrived' | 'none';

export type AppointmentQueueStatus = 'booked' | 'cancelled';

export interface AppointmentQueueRow {
  id: string;
  time: string;
  attendance: AppointmentAttendance;
  status: AppointmentQueueStatus;
}

export const APPOINTMENT_ATTENDANCE_LABELS: Record<AppointmentAttendance, string> = {
  attended: 'حضر',
  'not-arrived': 'لم يستلم',
  none: '—',
};

export const APPOINTMENT_QUEUE_STATUS_LABELS: Record<AppointmentQueueStatus, string> = {
  booked: 'محجوز',
  cancelled: 'ملغى',
};
