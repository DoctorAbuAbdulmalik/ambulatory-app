import { Component } from '@angular/core';

interface Hospital {
  name: string;
  clinicsCount: number;
}

@Component({
  imports: [],
  selector: 'app-section-two',
  styleUrl: './section-two.scss',
  templateUrl: './section-two.html',
  standalone: true,
})
export class SectionTwo {
  readonly hospitals: Hospital[] = [
    { name: 'المستشفى العسكري — دمشق', clinicsCount: 9 },
    { name: 'المستشفى العسكري — حلب', clinicsCount: 7 },
    { name: 'المستشفى العسكري — حمص', clinicsCount: 5 },
    { name: 'المستشفى العسكري — اللاذقية', clinicsCount: 3 },
  ];
}
