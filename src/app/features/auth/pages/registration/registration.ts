import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, maxLength, minLength, pattern, required, validate } from '@angular/forms/signals';
import { RegistrationStepOne } from '../components/registration-step-one/registration-step-one';
import { RegistrationStepTwo } from '../components/registration-step-two/registration-step-two';
import { RegistrationStepThree } from '../components/registration-step-three/registration-step-three';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { RegistrationModel } from '../../models/registration.models';

const NATIONAL_ID_PATTERN = /^[0-9]{11}$/;
const SYRIAN_PHONE_PATTERN = /^09[1-689][0-9]{7}$/;
const PASSWORD_COMPLEXITY_PATTERN = /(?=.*[a-z])(?=.*[A-Z])/;
const OTP_DIGIT_PATTERN = /^[0-9]$/;

@Component({
  imports: [RegistrationStepOne, RegistrationStepTwo, RegistrationStepThree],
  selector: 'app-registration',
  styleUrl: './registration.scss',
  templateUrl: './registration.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly model = signal<RegistrationModel>({
    step1: {
      fullName: '',
      nationalId: '',
      gender: '',
      birthDate: '',
      phone: '',
      agreement: false,
    },
    step2: {
      password: '',
      confirmPassword: '',
      confirmationCodeDigit_0: '',
      confirmationCodeDigit_1: '',
      confirmationCodeDigit_2: '',
      confirmationCodeDigit_3: '',
      confirmationCodeDigit_4: '',
      confirmationCodeDigit_5: '',
    },
    step3: {
      nationalId: '',
      password: '',
      notifyBySms: false,
      standardReviewPeriod: false,
    },
  });

  readonly registrationForm = form(this.model, (path) => {
    required(path.step1.fullName, { message: 'هذا الحقل مطلوب' });

    required(path.step1.nationalId, { message: 'هذا الحقل مطلوب' });
    pattern(path.step1.nationalId, NATIONAL_ID_PATTERN, {
      message: 'يجب أن يتكون الرقم الوطني من 11 رقماً فقط',
    });

    required(path.step1.gender, { message: 'هذا الحقل مطلوب' });
    required(path.step1.birthDate, { message: 'هذا الحقل مطلوب' });

    required(path.step1.phone, { message: 'هذا الحقل مطلوب' });
    pattern(path.step1.phone, SYRIAN_PHONE_PATTERN, { message: 'رقم الجوال غير صحيح' });

    required(path.step1.agreement, { message: 'يجب الموافقة على الشروط' });

    required(path.step2.password, { message: 'هذا الحقل مطلوب' });
    minLength(path.step2.password, 8, { message: '8 أحرف على الأقل' });
    pattern(path.step2.password, PASSWORD_COMPLEXITY_PATTERN, {
      message: 'يجب أن تحتوي على حرف كبير وحرف صغير على الأقل',
    });

    required(path.step2.confirmPassword, { message: 'هذا الحقل مطلوب' });
    validate(path.step2.confirmPassword, (ctx) =>
      ctx.value() !== ctx.valueOf(path.step2.password)
        ? { kind: 'mismatch', message: 'كلمتا المرور غير متطابقتين' }
        : undefined,
    );

    for (const digit of [
      path.step2.confirmationCodeDigit_0,
      path.step2.confirmationCodeDigit_1,
      path.step2.confirmationCodeDigit_2,
      path.step2.confirmationCodeDigit_3,
      path.step2.confirmationCodeDigit_4,
      path.step2.confirmationCodeDigit_5,
    ]) {
      required(digit, { message: 'مطلوب' });
      maxLength(digit, 1);
      pattern(digit, OTP_DIGIT_PATTERN, { message: 'رقم واحد فقط' });
    }

    required(path.step3.nationalId, { message: 'هذا الحقل مطلوب' });
    required(path.step3.password, { message: 'هذا الحقل مطلوب' });
  });

  private getStepFromUrl(): number {
    const step = this.route.snapshot.firstChild?.url[0]?.path;
    if (step === 'step1') return 1;
    if (step === 'step2') return 2;
    if (step === 'step3') return 3;
    return 1;
  }

  readonly currentStep = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.getStepFromUrl()),
    ),
    { initialValue: this.getStepFromUrl() },
  );

  nextStep(): void {
    const next = this.currentStep() + 1;
    if (next <= 3) {
      this.router.navigate([`step${next}`], { relativeTo: this.route });
    }
  }

  previousStep(): void {
    const prev = this.currentStep() - 1;
    if (prev >= 1) {
      this.router.navigate([`step${prev}`], { relativeTo: this.route });
    }
  }

  submitRegistration(): void {
    const root = this.registrationForm();
    if (root.invalid()) {
      root.markAsTouched();
      return;
    }
  }
}
