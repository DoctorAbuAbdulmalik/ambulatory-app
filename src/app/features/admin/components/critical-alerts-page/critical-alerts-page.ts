import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  CRITICAL_ALERT_SEVERITY_LABELS,
  CRITICAL_ALERT_SEVERITY_OPTIONS,
  CRITICAL_ALERT_STATUS_LABELS,
  CriticalAlert,
  CriticalAlertDraft,
  CriticalAlertSeverity,
  CriticalAlertStatus,
  formatAlertPeriod,
} from '../../models/critical-alerts.model';

const INITIAL_ALERTS: readonly CriticalAlert[] = [
  {
    id: 'a1',
    title: 'تعذّر حجز المواعيد عبر الموقع',
    text: 'نعمل على إصلاح عطل في نظام الحجز. يمكن حجز المواعيد هاتفياً خلال هذه الفترة.',
    severity: 'critical',
    startDate: '2026-07-26',
    endDate: '2026-07-31',
    status: 'active',
  },
  {
    id: 'a2',
    title: 'تغيير مواعيد عمل العيادات الخارجية',
    text: 'تعمل العيادات الخارجية من الساعة 9 صباحاً حتى 1 ظهراً خلال فترة العطلة.',
    severity: 'warning',
    startDate: '2026-07-18',
    endDate: '2026-07-22',
    status: 'ended',
  },
];

const INITIAL_FORM: CriticalAlertDraft = {
  title: 'توقف خدمة المختبر مؤقتاً',
  text: 'خدمة سحب العينات متوقفة بسبب أعمال صيانة. نعتذر عن الإزعاج.',
  severity: 'critical',
  startDate: '2026-08-01',
  endDate: '2026-08-03',
};

const EMPTY_FORM: CriticalAlertDraft = {
  title: '',
  text: '',
  severity: 'critical',
  startDate: '',
  endDate: '',
};

@Component({
  imports: [],
  selector: 'app-critical-alerts-page',
  styleUrl: './critical-alerts-page.scss',
  templateUrl: './critical-alerts-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CriticalAlertsPage {
  readonly severityOptions = CRITICAL_ALERT_SEVERITY_OPTIONS;
  readonly severityLabels = CRITICAL_ALERT_SEVERITY_LABELS;
  readonly statusLabels = CRITICAL_ALERT_STATUS_LABELS;
  readonly formatPeriod = formatAlertPeriod;

  private readonly alertsSignal = signal<readonly CriticalAlert[]>(INITIAL_ALERTS);
  readonly alerts = this.alertsSignal.asReadonly();

  private readonly formSignal = signal<CriticalAlertDraft>(INITIAL_FORM);
  readonly form = this.formSignal.asReadonly();

  private readonly editingIdSignal = signal<string | null>(null);
  readonly editingId = this.editingIdSignal.asReadonly();

  private nextId = INITIAL_ALERTS.length + 1;

  readonly isFormValid = computed(() => {
    const { title, startDate, endDate } = this.form();
    return title.trim().length > 0 && !!startDate && !!endDate && startDate <= endDate;
  });

  updateField<K extends keyof CriticalAlertDraft>(field: K, value: CriticalAlertDraft[K]): void {
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  onSeverityChange(value: string): void {
    this.updateField('severity', value as CriticalAlertSeverity);
  }

  publish(): void {
    // TODO: إرسال التنبيه إلى الخادم مع التاريخ ومعرّف المستخدم
    this.save('active');
  }

  saveDraft(): void {
    // TODO: حفظ المسودة على الخادم
    this.save('draft');
  }

  edit(alert: CriticalAlert): void {
    const { id, status, ...draft } = alert;
    this.formSignal.set(draft);
    this.editingIdSignal.set(id);
  }

  cancelEdit(): void {
    this.resetForm();
  }

  stop(alert: CriticalAlert): void {
    // TODO: إيقاف التنبيه على الخادم
    this.alertsSignal.update((alerts) =>
      alerts.map((item) => (item.id === alert.id ? { ...item, status: 'ended' } : item)),
    );

    if (this.editingId() === alert.id) {
      this.resetForm();
    }
  }

  private save(status: CriticalAlertStatus): void {
    if (!this.isFormValid()) {
      return;
    }

    const draft = this.form();
    const editingId = this.editingId();

    if (editingId) {
      this.alertsSignal.update((alerts) =>
        alerts.map((item) => (item.id === editingId ? { ...item, ...draft, status } : item)),
      );
    } else {
      const alert: CriticalAlert = { ...draft, id: `a${this.nextId++}`, status };
      this.alertsSignal.update((alerts) => [alert, ...alerts]);
    }

    this.resetForm();
  }

  private resetForm(): void {
    this.formSignal.set(EMPTY_FORM);
    this.editingIdSignal.set(null);
  }
}
