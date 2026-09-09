import { Injectable, signal, computed, effect } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private seconds = signal<number>(0);
  private timerSubscription?: Subscription;

  readonly timerDisplay = computed(() => {
    const seconds = this.seconds();
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  });

  readonly isTimerRunning = computed(() => this.seconds() > 0);
  readonly isTimerExpired = computed(() => this.seconds() === 0);

  startTimer(durationSeconds: number = 180): void {
    this.stopTimer();
    this.seconds.set(durationSeconds);

    this.timerSubscription = interval(1000).subscribe(() => {
      const current = this.seconds();
      if (current > 0) {
        this.seconds.set(current - 1);
      } else {
        this.stopTimer();
      }
    });
  }

  stopTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = undefined;
  }

  resetTimer(durationSeconds: number = 180): void {
    this.stopTimer();
    this.seconds.set(durationSeconds);
  }

  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
