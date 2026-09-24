import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  RECEPTION_ACCOUNT_STATUS_LABELS,
  RECEPTION_PERMISSION_LABELS,
  ReceptionAccountRow,
} from '../../models/reception-accounts.model';

const ROWS: readonly ReceptionAccountRow[] = [
  { id: 'r1', permissions: ['registration', 'appointments'], status: 'active' },
  { id: 'r2', permissions: ['appointments'], status: 'active' },
  { id: 'r3', permissions: ['registration', 'schedules'], status: 'active' },
  { id: 'r4', permissions: ['appointments'], status: 'disabled' },
];

@Component({
  imports: [],
  selector: 'app-reception-accounts-page',
  styleUrl: './reception-accounts-page.scss',
  templateUrl: './reception-accounts-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceptionAccountsPage {
  private readonly rowsSignal = signal<readonly ReceptionAccountRow[]>(ROWS);
  readonly rows = this.rowsSignal.asReadonly();

  readonly statusLabels = RECEPTION_ACCOUNT_STATUS_LABELS;
  readonly permissionLabels = RECEPTION_PERMISSION_LABELS;

  onAddAccount(): void {
    // TODO: فتح نموذج إنشاء حساب موظف استقبال جديد
  }

  onEdit(row: ReceptionAccountRow): void {
    // TODO: فتح نموذج تعديل بيانات الحساب وصلاحياته
  }

  toggleStatus(row: ReceptionAccountRow): void {
    // TODO: إرسال طلب التفعيل / التعطيل إلى الخادم
    this.rowsSignal.update((rows) =>
      rows.map((item) =>
        item.id === row.id
          ? { ...item, status: item.status === 'active' ? 'disabled' : 'active' }
          : item,
      ),
    );
  }
}
