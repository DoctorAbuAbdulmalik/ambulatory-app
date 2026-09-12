import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { SectionOne } from '../../components/section-one/section-one';
import { SectionTwo } from '../../components/section-two/section-two';
import { SectionThree } from '../../components/section-three/section-three';
import { SectionFour } from '../../components/section-four/section-four';
import { SectionFive } from '../../components/section-five/section-five';
import { Footer } from '../../components/footer/footer';

@Component({
  imports: [
    Header,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionFour,
    SectionFive,
    Footer
  ],
  selector: 'app-landing-page',
  styleUrl: './landing-page.scss',
  templateUrl: './landing-page.html',
  standalone: true,
})
export class LandingPage {}
