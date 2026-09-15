import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

interface PatientData {
  fullName: string;
  email: string;
  nationalId: string;
  mobile: string;
  fileNumber: string;
  isVerified: boolean;
  avatarUrl?: string;
}

@Component({
  imports: [],
  selector: 'app-patient-account',
  styleUrl: './patient-account.scss',
  templateUrl: './patient-account.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientAccount {
  activeTab: 'appointments' | 'booking' | 'account' = 'account';

  // Тестовые данные для отображения. В реальном компоненте будут приходить с бэкенда.
  patient: PatientData = {
    fullName: 'أحمد محمد العلي',
    email: 'ahmed.ali@example.com',
    nationalId: '1234567890',
    mobile: '+966 50 123 4567',
    fileNumber: '#00123456',
    isVerified: true,
    avatarUrl: undefined,
  };

  constructor(private router: Router) {}

  setTab(tab: 'appointments' | 'booking' | 'account'): void {
    this.activeTab = tab;

    if (tab === 'booking') {
      // TODO: навигация на страницу бронирования, если она есть отдельным роутом
    }
  }

  onEditData(): void {
    this.router.navigate(['/auth/register']);
  }

  onBookAppointment(): void {
    // TODO: заменить на реальный роут бронирования, когда он будет готов
    // this.router.navigate(['/appointments/book']);
  }
}
