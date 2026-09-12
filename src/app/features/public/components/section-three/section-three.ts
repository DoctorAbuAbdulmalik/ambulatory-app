import { Component, computed, signal } from '@angular/core';

interface Clinic {
  name: string;
  status: string;
}

const CLINICS: Clinic[] = [
  { name: 'العيون', status: 'أقرب موعد 2 آب' },
  { name: 'القلب', status: 'أقرب موعد 11 آب' },
  { name: 'الباطنية', status: 'أقرب موعد 28 تموز' },
  { name: 'الأسنان', status: 'الحجز مغلق حالياً' },
  { name: 'الأطفال', status: 'أقرب موعد 27 تموز' },
  { name: 'العظام', status: 'أقرب موعد 6 آب' },
];

@Component({
  imports: [],
  selector: 'app-section-three',
  styleUrl: './section-three.scss',
  templateUrl: './section-three.html',
  standalone: true,
})
export class SectionThree {
  readonly cities: readonly string[] = ['دمشق', 'حلب', 'حمص', 'اللاذقية'];

  private readonly selectedCitySignal = signal(this.cities[0]);
  readonly selectedCity = this.selectedCitySignal.asReadonly();

  readonly clinics = computed(() => CLINICS);

  private readonly selectedClinicsSignal = signal<ReadonlySet<string>>(new Set());
  readonly selectedClinics = this.selectedClinicsSignal.asReadonly();

  selectCity(city: string): void {
    this.selectedCitySignal.set(city);
  }

  isClinicSelected(clinicName: string): boolean {
    return this.selectedClinics().has(clinicName);
  }

  toggleClinic(clinicName: string): void {
    const next = new Set(this.selectedClinicsSignal());
    if (next.has(clinicName)) {
      next.delete(clinicName);
    } else {
      next.add(clinicName);
    }
    this.selectedClinicsSignal.set(next);
  }
}
