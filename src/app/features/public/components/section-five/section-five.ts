import { Component } from '@angular/core';

interface NewsItem {
  date: string;
  title: string;
  summary: string;
}

@Component({
  imports: [],
  selector: 'app-section-five',
  styleUrl: './section-five.scss',
  templateUrl: './section-five.html',
  standalone: true,
})
export class SectionFive {
  readonly news: readonly NewsItem[] = [
    { date: '24 تموز', title: 'بدء العمل بنظام الحجز في اللاذقية', summary: 'سطر ملخّص قصير للخبر' },
    { date: '20 تموز', title: 'توسيع ساعات عمل عيادة الجلدية', summary: 'سطر ملخّص قصير للخبر' },
    { date: '15 تموز', title: 'تحديث إجراءات توثيق الهوية', summary: 'سطر ملخّص قصير للخبر' },
    { date: '8 تموز', title: 'توقف مؤقت للخدمة للصيانة', summary: 'سطر ملخّص قصير للخبر' },
  ];
}
