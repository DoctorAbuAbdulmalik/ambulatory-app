import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOSPITAL_STATUS_LABELS, HospitalRow } from '../../models/hospital-management.model';

const ROWS: readonly HospitalRow[] = [
  { id: 'h1', status: 'locked' },
  { id: 'h2', status: 'locked' },
  { id: 'h3', status: 'locked' },
  { id: 'h4', status: 'disabled' },
];

@Component({
  imports: [],
  selector: 'app-hospital-management-page',
  styleUrl: './hospital-management-page.scss',
  templateUrl: './hospital-management-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HospitalManagementPage {
  readonly rows = ROWS;
  readonly statusLabels = HOSPITAL_STATUS_LABELS;

  onAddHospital(): void {
    // TODO: فتح نموذج إضافة مستشفى جديد
  }

  onEdit(row: HospitalRow): void {
    // TODO: فتح نموذج تعديل بيانات المستشفى
  }
}
