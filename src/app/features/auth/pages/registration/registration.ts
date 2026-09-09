import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationStepOne } from '../components/registration-step-one/registration-step-one';
import { RegistrationStepTwo } from '../components/registration-step-two/registration-step-two';
import { RegistrationStepThree } from '../components/registration-step-three/registration-step-three';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  imports: [RegistrationStepOne, RegistrationStepTwo, RegistrationStepThree, ReactiveFormsModule],
  selector: 'app-registration',
  styleUrl: './registration.scss',
  templateUrl: './registration.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration {
  private readonly fb = inject(FormBuilder);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly registrationForm = this.fb.group({
    step1: this.fb.group({
      fullName: ['', Validators.required],
      nationalId: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      agreement: [false, Validators.required],
    }),

    step2: this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      confirmationCodeDigit_0: [''],
      confirmationCodeDigit_1: [''],
      confirmationCodeDigit_2: [''],
      confirmationCodeDigit_3: [''],
      confirmationCodeDigit_4: [''],
      confirmationCodeDigit_5: [''],
    }),

    step3: this.fb.group({}),
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
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    console.log('Registration data:', this.registrationForm.getRawValue());
  }
}
