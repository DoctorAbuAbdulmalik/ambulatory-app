import { Component, signal } from '@angular/core';

interface BookingStep {
  id: string;
  title: string;
  description: string;
}

const STEPS: BookingStep[] = [
  { id: 'create-account', title: 'أنشئ حسابك', description: 'بالرقم الوطني ورقم الموبايل.' },
  { id: 'verify-identity', title: 'وثّق هويتك', description: 'يعتمدها موظف الاستقبال.' },
  { id: 'choose-clinic', title: 'اختر العيادة والموعد', description: 'من الأوقات المتاحة.' },
  { id: 'attend', title: 'احضر في موعدك', description: 'يصلك تأكيد وتذكير.' },
];

@Component({
  imports: [],
  selector: 'app-section-four',
  styleUrl: './section-four.scss',
  templateUrl: './section-four.html',
  standalone: true,
})
export class SectionFour {
  readonly steps: readonly BookingStep[] = STEPS;

  private readonly selectedStepSignal = signal(STEPS[0].id);
  readonly selectedStep = this.selectedStepSignal.asReadonly();

  selectStep(stepId: string): void {
    this.selectedStepSignal.set(stepId);
  }
}
