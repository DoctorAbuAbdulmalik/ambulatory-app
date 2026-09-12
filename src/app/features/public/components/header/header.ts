import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  standalone: true,
})
export class Header {
  private readonly isMenuOpenSignal = signal(false);
  readonly isMenuOpen = this.isMenuOpenSignal.asReadonly();

  toggleMenu(): void {
    this.isMenuOpenSignal.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpenSignal.set(false);
  }
}
