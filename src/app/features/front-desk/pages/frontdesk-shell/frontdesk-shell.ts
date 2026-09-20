import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PatientRequestsPage } from '../../components/patient-requests-page/patient-requests-page';
import { PatientAppointmentsPage } from '../../components/patient-appointments-page/patient-appointments-page';
import { ClinicSchedulePage } from '../../components/clinic-schedule-page/clinic-schedule-page';
import { AppointmentsManagementPage } from '../../components/appointments-management-page/appointments-management-page';
import { FrontdeskNavItem, FrontdeskViewId } from '../../models/frontdesk-nav.model';

const NAV_ITEMS: readonly FrontdeskNavItem[] = [
  { id: 'registration-requests', label: 'طلبات التسجيل' },
  { id: 'appointments', label: 'المواعيد' },
  { id: 'clinic-schedules', label: 'جداول العيادات' },
  { id: 'clinics', label: 'العيادات' },
];

@Component({
  imports: [
    NgTemplateOutlet,
    PatientRequestsPage,
    PatientAppointmentsPage,
    ClinicSchedulePage,
    AppointmentsManagementPage,
  ],
  selector: 'app-frontdesk-shell',
  styleUrl: './frontdesk-shell.scss',
  templateUrl: './frontdesk-shell.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontdeskShell {
  readonly navItems = NAV_ITEMS;

  private readonly activeViewSignal = signal<FrontdeskViewId>('registration-requests');
  readonly activeView = this.activeViewSignal.asReadonly();

  readonly headerTitle = computed(() => {
    const activeItem = this.navItems.find((item) => item.id === this.activeView());
    return `موظف الاستقبال — ${activeItem?.label ?? ''}`;
  });

  selectView(id: FrontdeskViewId): void {
    this.activeViewSignal.set(id);
  }
}
