import { Component } from '@angular/core';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrl: './treatments.component.css'
})
export class TreatmentsComponent {
  treatments = [
    { img: 'assets/images/image11.jpg', title: 'Complete Detox' },
    { img: 'assets/images/image11.jpg', title: 'Stress Management' },
    { img: 'assets/images/image11.jpg', title: 'Weight Management' },
    { img: 'assets/images/image11.jpg', title: 'Ayurveda Immunity Boosting' },
    { img: 'assets/images/image11.jpg', title: 'Specific Ailments And Conditions' }
  ];
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
