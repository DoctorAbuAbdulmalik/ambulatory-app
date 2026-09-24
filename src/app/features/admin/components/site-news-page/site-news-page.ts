import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITE_NEWS_STATUS_LABELS, SiteNewsRow } from '../../models/site-news.model';

const ROWS: readonly SiteNewsRow[] = [
  { id: 'n1', status: 'published' },
  { id: 'n2', status: 'published' },
  { id: 'n3', status: 'draft' },
  { id: 'n4', status: 'draft' },
];

@Component({
  imports: [],
  selector: 'app-site-news-page',
  styleUrl: './site-news-page.scss',
  templateUrl: './site-news-page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteNewsPage {
  // Array order is the display priority on the home page: index 0 is shown first.
  private readonly rowsSignal = signal<readonly SiteNewsRow[]>(ROWS);
  readonly rows = this.rowsSignal.asReadonly();

  readonly statusLabels = SITE_NEWS_STATUS_LABELS;

  onAddNews(): void {
    // TODO: فتح نموذج إضافة خبر جديد ونشره
  }

  onEdit(row: SiteNewsRow): void {
    // TODO: فتح نموذج تعديل محتوى الخبر
  }

  moveUp(index: number): void {
    // TODO: حفظ الترتيب الجديد على الخادم
    if (index <= 0) {
      return;
    }

    this.rowsSignal.update((rows) => {
      const next = [...rows];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }
}
