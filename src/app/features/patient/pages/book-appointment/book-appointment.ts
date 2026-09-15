import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BookStepHospital } from '../../components/book-step-hospital/book-step-hospital';
import { BookStepClinic } from '../../components/book-step-clinic/book-step-clinic';
import { BookStepDoctor } from '../../components/book-step-doctor/book-step-doctor';
import { BookStepDatetime } from '../../components/book-step-datetime/book-step-datetime';
import { BookStepConfirm } from '../../components/book-step-confirm/book-step-confirm';
import {
  BookingClinic,
  BookingDay,
  BookingDoctor,
  BookingHospital,
  BookingTimeSlot,
} from '../../models/booking.models';

const HOSPITALS: readonly BookingHospital[] = [
  { id: 'damascus', name: 'المستشفى العسكري — دمشق', clinicsCount: 9 },
  { id: 'aleppo', name: 'المستشفى العسكري — حلب', clinicsCount: 7 },
  { id: 'homs', name: 'المستشفى العسكري — حمص', clinicsCount: 5 },
  { id: 'latakia', name: 'المستشفى العسكري — اللاذقية', clinicsCount: 3 },
];

const CLINIC_TEMPLATES: readonly { key: string; name: string }[] = [
  { key: 'internal', name: 'الباطنية' },
  { key: 'cardiology', name: 'القلب' },
  { key: 'ophthalmology', name: 'العيون' },
  { key: 'dental', name: 'الأسنان' },
];

function buildClinicsForHospital(hospitalId: string): BookingClinic[] {
  if (hospitalId === 'damascus') {
    return [
      { id: 'damascus-internal', hospitalId, name: 'الباطنية', doctorsCount: 6 },
      { id: 'damascus-cardiology', hospitalId, name: 'القلب', doctorsCount: 4 },
      { id: 'damascus-ophthalmology', hospitalId, name: 'العيون', doctorsCount: 4 },
      {
        id: 'damascus-dental',
        hospitalId,
        name: 'الأسنان',
        doctorsCount: 0,
        disabled: true,
        disabledReason: 'العيادة مغلقة مؤقتاً',
      },
    ];
  }

  return CLINIC_TEMPLATES.map((template, index) => ({
    id: `${hospitalId}-${template.key}`,
    hospitalId,
    name: template.name,
    doctorsCount: 3 + index,
  }));
}

function buildDoctorsForClinic(clinicId: string): BookingDoctor[] {
  if (clinicId === 'damascus-internal') {
    return [
      {
        id: 'damascus-internal-d1',
        clinicId,
        name: 'د. سامر الخطيب',
        title: 'استشاري',
        availableSlots: 6,
      },
      {
        id: 'damascus-internal-d2',
        clinicId,
        name: 'د. ريما الحلبي',
        title: 'أخصائية',
        availableSlots: 4,
      },
      {
        id: 'damascus-internal-d3',
        clinicId,
        name: 'د. عمار الدرويش',
        title: '',
        availableSlots: 0,
        disabled: true,
      },
    ];
  }

  return [
    { id: `${clinicId}-d1`, clinicId, name: 'د. محمد النجار', title: 'استشاري', availableSlots: 5 },
    { id: `${clinicId}-d2`, clinicId, name: 'د. لينا حداد', title: 'أخصائية', availableSlots: 3 },
  ];
}

const DAYS: readonly BookingDay[] = [
  { id: 'sun', label: 'الأحد', date: 26 },
  { id: 'mon', label: 'الاثنين', date: 27 },
  { id: 'tue', label: 'الثلاثاء', date: 28 },
  { id: 'wed', label: 'الأربعاء', date: 29 },
  { id: 'thu', label: 'الخميس', date: 30 },
  { id: 'fri', label: 'الجمعة', date: 31, disabled: true },
  { id: 'sat', label: 'السبت', date: 1, disabled: true },
];

const TIME_SLOTS: readonly BookingTimeSlot[] = [
  { id: 't1', label: '09:00 ص' },
  { id: 't2', label: '10:00 ص' },
  { id: 't3', label: '11:00 ص' },
  { id: 't4', label: '12:00 م' },
  { id: 't5', label: '01:00 م' },
  { id: 't6', label: '02:00 م' },
];

const TOTAL_STEPS = 5;

const STEP_TITLES: Record<number, string> = {
  1: 'حجز موعد — اختر المستشفى',
  2: 'حجز موعد — اختر العيادة',
  3: 'حجز موعد — اختر الطبيب',
  4: 'حجز موعد — اليوم والوقت',
  5: 'حجز موعد — تأكيد الحجز',
};

const SECTION_TITLES: Record<number, string> = {
  1: 'اختر المستشفى',
  2: 'اختر العيادة',
  3: 'اختر الطبيب',
};

@Component({
  imports: [BookStepHospital, BookStepClinic, BookStepDoctor, BookStepDatetime, BookStepConfirm],
  selector: 'app-book-appointment',
  styleUrl: './book-appointment.scss',
  templateUrl: './book-appointment.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAppointment {
  private readonly router = inject(Router);

  readonly totalSteps = TOTAL_STEPS;
  readonly stepIndexes: readonly number[] = Array.from({ length: TOTAL_STEPS }, (_, i) => i);

  readonly hospitals = HOSPITALS;
  readonly days = DAYS;
  readonly timeSlots = TIME_SLOTS;

  readonly bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

  private readonly currentStepSignal = signal(1);
  readonly currentStep = this.currentStepSignal.asReadonly();

  private readonly selectedHospitalIdSignal = signal<string | null>(null);
  readonly selectedHospitalId = this.selectedHospitalIdSignal.asReadonly();

  private readonly selectedClinicIdSignal = signal<string | null>(null);
  readonly selectedClinicId = this.selectedClinicIdSignal.asReadonly();

  private readonly selectedDoctorIdSignal = signal<string | null>(null);
  readonly selectedDoctorId = this.selectedDoctorIdSignal.asReadonly();

  private readonly selectedDayIdSignal = signal<string | null>(null);
  readonly selectedDayId = this.selectedDayIdSignal.asReadonly();

  private readonly selectedTimeIdSignal = signal<string | null>(null);
  readonly selectedTimeId = this.selectedTimeIdSignal.asReadonly();

  readonly selectedHospital = computed(() =>
    this.hospitals.find((hospital) => hospital.id === this.selectedHospitalId()),
  );

  readonly clinicsForSelectedHospital = computed(() => {
    const hospitalId = this.selectedHospitalId();
    return hospitalId ? buildClinicsForHospital(hospitalId) : [];
  });

  readonly selectedClinic = computed(() =>
    this.clinicsForSelectedHospital().find((clinic) => clinic.id === this.selectedClinicId()),
  );

  readonly doctorsForSelectedClinic = computed(() => {
    const clinicId = this.selectedClinicId();
    return clinicId ? buildDoctorsForClinic(clinicId) : [];
  });

  readonly selectedDoctor = computed(() =>
    this.doctorsForSelectedClinic().find((doctor) => doctor.id === this.selectedDoctorId()),
  );

  readonly selectedDay = computed(() => this.days.find((day) => day.id === this.selectedDayId()));

  readonly selectedTimeSlot = computed(() =>
    this.timeSlots.find((slot) => slot.id === this.selectedTimeId()),
  );

  readonly headerTitle = computed(() => STEP_TITLES[this.currentStep()]);
  readonly sectionTitle = computed(() => SECTION_TITLES[this.currentStep()] ?? null);

  readonly breadcrumb = computed(() => {
    const step = this.currentStep();

    if (step === 2) {
      return this.selectedHospital()?.name ?? null;
    }

    if (step === 3) {
      const hospital = this.selectedHospital();
      const clinic = this.selectedClinic();
      return hospital && clinic ? `${clinic.name} — ${hospital.name}` : null;
    }

    return null;
  });

  readonly canGoNext = computed(() => {
    switch (this.currentStep()) {
      case 1:
        return this.selectedHospitalId() !== null;
      case 2:
        return this.selectedClinicId() !== null;
      case 3:
        return this.selectedDoctorId() !== null;
      case 4:
        return this.selectedDayId() !== null && this.selectedTimeId() !== null;
      default:
        return true;
    }
  });

  readonly summaryClinicAndDoctor = computed(() => {
    const clinic = this.selectedClinic();
    const doctor = this.selectedDoctor();
    return clinic && doctor ? `${clinic.name} — ${doctor.name}` : '';
  });

  readonly summaryDateAndTime = computed(() => {
    const day = this.selectedDay();
    const time = this.selectedTimeSlot();
    return day && time ? `${day.label} ${day.date} — ${time.label}` : '';
  });

  selectHospital(id: string): void {
    this.selectedHospitalIdSignal.set(id);
    this.selectedClinicIdSignal.set(null);
    this.selectedDoctorIdSignal.set(null);
  }

  selectClinic(id: string): void {
    this.selectedClinicIdSignal.set(id);
    this.selectedDoctorIdSignal.set(null);
  }

  selectDoctor(id: string): void {
    this.selectedDoctorIdSignal.set(id);
  }

  selectDay(id: string): void {
    this.selectedDayIdSignal.set(id);
  }

  selectTime(id: string): void {
    this.selectedTimeIdSignal.set(id);
  }

  goNext(): void {
    if (this.canGoNext() && this.currentStep() < this.totalSteps) {
      this.currentStepSignal.update((step) => step + 1);
    }
  }

  goBack(): void {
    if (this.currentStep() > 1) {
      this.currentStepSignal.update((step) => step - 1);
    }
  }

  onPrint(): void {
    window.print();
  }

  onGoToAppointments(): void {
    this.router.navigate(['/patient/appointments']);
  }
}
