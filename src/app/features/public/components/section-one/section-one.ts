import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-section-one',
  styleUrl: './section-one.scss',
  templateUrl: './section-one.html',
  standalone: true,
})
export class SectionOne {
  private readonly router = inject(Router);

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

  onCreateAccount(): void {
    this.router.navigate(['/auth/register']);
  }

  openLoginPage(): void {
    this.router.navigate(['/auth/login'])
  }
}
