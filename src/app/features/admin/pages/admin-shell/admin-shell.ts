import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  FRONTDESK_NAV_ITEMS,
  FrontdeskNavItem,
} from '../../../front-desk/models/frontdesk-nav.model';
import { PatientRequestsPage } from '../../../front-desk/components/patient-requests-page/patient-requests-page';
import { PatientAppointmentsPage } from '../../../front-desk/components/patient-appointments-page/patient-appointments-page';
import { ClinicSchedulePage } from '../../../front-desk/components/clinic-schedule-page/clinic-schedule-page';
import { AppointmentsManagementPage } from '../../../front-desk/components/appointments-management-page/appointments-management-page';
import { HospitalManagementPage } from '../../components/hospital-management-page/hospital-management-page';
import { ReceptionAccountsPage } from '../../components/reception-accounts-page/reception-accounts-page';
import { ADMIN_TOOL_NAV_ITEMS, AdminNavItem, AdminViewId } from '../../models/admin-nav.model';

const ADMIN_HEADER_SECTIONS: Partial<Record<AdminViewId, string>> = {
  'reception-accounts': 'حسابات موظفي الاستقبال',
};

@Component({
  imports: [
    PatientRequestsPage,
    PatientAppointmentsPage,
    ClinicSchedulePage,
    AppointmentsManagementPage,
    HospitalManagementPage,
    ReceptionAccountsPage,
  ],
  selector: 'app-admin-shell',
  styleUrl: './admin-shell.scss',
  templateUrl: './admin-shell.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShell {
  readonly frontdeskNavItems: readonly FrontdeskNavItem[] = FRONTDESK_NAV_ITEMS;
  readonly adminToolNavItems: readonly AdminNavItem[] = ADMIN_TOOL_NAV_ITEMS;

  private readonly activeViewSignal = signal<AdminViewId>('hospitals');
  readonly activeView = this.activeViewSignal.asReadonly();

  readonly headerTitle = computed(() => {
    const section = ADMIN_HEADER_SECTIONS[this.activeView()] ?? 'أدوات الإدارة';
    return `المسؤول — ${section}`;
  });

  selectView(id: AdminViewId): void {
    this.activeViewSignal.set(id);
  }
}
