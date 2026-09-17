import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  REGISTRATION_REQUEST_STATUS_LABELS,
  RegistrationRequestRow,
  RegistrationRequestStatus,
} from '../../models/registration-request.model';

interface RequestsStat {
  label: string;
  value: number;
}

const STATS: readonly RequestsStat[] = [
  { label: 'قيد المراجعة', value: 5 },
  { label: 'أعُد اليوم', value: 12 },
  { label: 'عدم تطابق', value: 2 },
  { label: 'محجوب', value: 1 },
];

const ROWS: readonly RegistrationRequestRow[] = [
  { id: 'r1', status: 'pending-review' },
  { id: 'r2', status: 'pending-review' },
  { id: 'r3', status: 'mismatch' },
  { id: 'r4', status: 'verified' },
  { id: 'r5', status: 'blocked' },
];

const STATUS_FILTER_OPTIONS: readonly { id: RegistrationRequestStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'كل الحالات' },
  { id: 'pending-review', label: REGISTRATION_REQUEST_STATUS_LABELS['pending-review'] },
  { id: 'mismatch', label: REGISTRATION_REQUEST_STATUS_LABELS['mismatch'] },
  { id: 'verified', label: REGISTRATION_REQUEST_STATUS_LABELS['verified'] },
  { id: 'blocked', label: REGISTRATION_REQUEST_STATUS_LABELS['blocked'] },
];

@Component({
  imports: [],
  selector: 'app-patient-requests-page',
  styleUrl: './patient-requests-page.scss',
  templateUrl: './patient-requests-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientRequestsPage {
  readonly stats = STATS;
  readonly statusFilterOptions = STATUS_FILTER_OPTIONS;
  readonly statusLabels = REGISTRATION_REQUEST_STATUS_LABELS;

  private readonly statusFilterSignal = signal<RegistrationRequestStatus | 'all'>('all');
  readonly statusFilter = this.statusFilterSignal.asReadonly();

  readonly rows = computed(() => {
    const filter = this.statusFilter();
    return filter === 'all' ? ROWS : ROWS.filter((row) => row.status === filter);
  });

  setStatusFilter(value: string): void {
    this.statusFilterSignal.set(value as RegistrationRequestStatus | 'all');
  }

  resetFilters(): void {
    this.statusFilterSignal.set('all');
  }

  onExport(): void {
    // TODO: تصدير طلبات التسجيل عند توفر الـ API
  }

  onApproveSelected(): void {
    // TODO: اعتماد الطلبات المحددة عند توفر الـ API
  }

  onReview(row: RegistrationRequestRow): void {
    // TODO: فتح تفاصيل الطلب للمراجعة
  }
}
