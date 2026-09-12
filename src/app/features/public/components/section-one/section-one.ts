import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-section-one',
  styleUrl: './section-one.scss',
  templateUrl: './section-one.html',
  standalone: true,
})
export class SectionOne {
  private readonly selectedServicesSignal = signal<ReadonlySet<string>>(new Set());
  readonly selectedServices = this.selectedServicesSignal.asReadonly();

  isServiceSelected(service: string): boolean {
    return this.selectedServices().has(service);
  }

  toggleService(service: string): void {
    const next = new Set(this.selectedServicesSignal());
    if (next.has(service)) {
      next.delete(service);
    } else {
      next.add(service);
    }
    this.selectedServicesSignal.set(next);
  }
}
