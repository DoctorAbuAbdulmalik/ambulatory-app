import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly isPasswordVisible = signal(false);
  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    nationalId: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  togglePasswordVisibility(): void {
    this.isPasswordVisible.update((visible) => !visible);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      if (this.form.controls.nationalId.hasError('required')) {
      } else if (this.form.controls.nationalId.hasError('pattern')) {
      } else if (this.form.controls.password.hasError('required')) {
      }

      return;
    }

    this.isSubmitting.set(true);

    const { nationalId, password, remember } = this.form.getRawValue();

    setTimeout(() => {
      this.isSubmitting.set(false);
    }, 800);
  }

  normalizeNationalId(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 11);

    if (input.value !== value) {
      input.value = value;
    }

    this.form.controls.nationalId.setValue(value);
  }

  onRegisterClick(): void {
    this.router.navigate(['/auth/register']);
  }
}
