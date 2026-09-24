import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, maxLength, pattern, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import {
  fieldErrorMessage as getFieldErrorMessage,
  isFieldInvalid as checkFieldInvalid,
} from '../../../../shared/forms/field-helpers';
import { AuthService } from '../../../../shared/auth/auth.service';
import { ROLE_HOME_ROUTES } from '../../../../shared/auth/user-role.model';

interface LoginModel {
  nationalId: string;
  password: string;
  remember: boolean;
}

const NATIONAL_ID_PATTERN = /^[0-9]{11}$/;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  readonly isPasswordVisible = signal(false);
  readonly isSubmitting = signal(false);

  private readonly model = signal<LoginModel>({
    nationalId: '',
    password: '',
    remember: false,
  });

  readonly loginForm = form(this.model, (path) => {
    required(path.nationalId, { message: 'يرجى إدخال الرقم الوطني' });
    maxLength(path.nationalId, 11);
    pattern(path.nationalId, NATIONAL_ID_PATTERN, {
      message: 'يجب أن يتكون الرقم الوطني من 11 رقماً فقط',
    });

    required(path.password, { message: 'يرجى إدخال كلمة المرور' });
  });

  readonly isFieldInvalid = checkFieldInvalid;
  readonly fieldErrorMessage = getFieldErrorMessage;

  togglePasswordVisibility(): void {
    this.isPasswordVisible.update((visible) => !visible);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const root = this.loginForm();
    if (root.invalid()) {
      root.markAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // TODO: send nationalId / password / remember to the backend instead of the mock login
    const { password } = this.model();
    const role = this.auth.login(password);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigateByUrl(ROLE_HOME_ROUTES[role]);
    }, 800);
  }

  normalizeNationalId(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 11);

    if (input.value !== value) {
      input.value = value;
    }

    this.loginForm.nationalId().value.set(value);
  }

  onRegisterClick(): void {
    this.router.navigate(['/auth/register']);
  }
}
