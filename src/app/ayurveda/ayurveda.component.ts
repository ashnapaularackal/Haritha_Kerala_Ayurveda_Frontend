// src/app/ayurveda/ayurveda.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-ayurveda',
  templateUrl: './ayurveda.component.html',
  styleUrls: ['./ayurveda.component.css']
})
export class AyurvedaComponent {
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
