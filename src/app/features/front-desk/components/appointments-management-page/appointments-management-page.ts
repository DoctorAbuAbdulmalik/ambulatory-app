import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLINIC_STATUS_LABELS, ClinicRow } from '../../models/clinic-management.model';

const ROWS: readonly ClinicRow[] = [
  { id: 'c1', workHours: '08:00 — 14:00', duration: '30 د', status: 'open' },
  { id: 'c2', workHours: '09:00 — 13:00', duration: '20 د', status: 'open' },
  { id: 'c3', workHours: '08:00 — 12:00', duration: '30 د', status: 'open' },
  { id: 'c4', workHours: '10:00 — 14:00', duration: '15 د', status: 'closed' },
  { id: 'c5', workHours: '08:00 — 14:00', duration: '30 د', status: 'open' },
];

@Component({
  imports: [],
  selector: 'app-appointments-management-page',
  styleUrl: './appointments-management-page.scss',
  templateUrl: './appointments-management-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsManagementPage {
  readonly rows = ROWS;
  readonly statusLabels = CLINIC_STATUS_LABELS;
  readonly totalCount = ROWS.length;
  readonly visibleCount = ROWS.length;

  onAddClinic(): void {
    // TODO: فتح نموذج إضافة عيادة جديدة
  }

  onEdit(row: ClinicRow): void {
    // TODO: فتح نموذج تعديل بيانات العيادة
  }
}
