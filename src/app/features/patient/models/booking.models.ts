export interface BookingHospital {
  id: string;
  name: string;
  clinicsCount: number;
}

export interface BookingClinic {
  id: string;
  hospitalId: string;
  name: string;
  doctorsCount: number;
  disabled?: boolean;
  disabledReason?: string;
}

export interface BookingDoctor {
  id: string;
  clinicId: string;
  name: string;
  title: string;
  availableSlots: number;
  disabled?: boolean;
}

export interface BookingDay {
  id: string;
  label: string;
  date: number;
  disabled?: boolean;
}

export interface BookingTimeSlot {
  id: string;
  label: string;
  disabled?: boolean;
}
