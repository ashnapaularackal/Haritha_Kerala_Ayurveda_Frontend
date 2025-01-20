import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface Image {
  src: string;
  alt: string;
  text: string;
  details: string;
  flipped: boolean;
  label: string;
  path: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  images: Image[] = [
    {
      src: 'assets/images/image2.png',
      alt: 'Ayurveda Therapy',
      text: 'Experience the healing power of traditional Ayurvedic therapies to restore balance and well-being.',
      details: 'Our Panchakarma Packages include detoxification, herbal therapies, and dietary guidance.',
      flipped: false,
      label: 'Panchakarma Packages',
      path: 'panchakarma'
    },
    {
      src: 'assets/images/image3.jpg',
      alt: 'Yoga and Meditation',
      text: 'Enhance your physical and mental health through our yoga and meditation sessions.',
      details: 'Our Treatment Packages offer customized yoga sessions, meditation, and lifestyle counseling.',
      flipped: false,
      label: 'Treatment Packages',
      path: 'ayurveda'
    },
    {
      src: 'assets/images/image4.jpg',
      alt: 'Pranayama',
      text: 'Learn and practice Pranayama to regulate your breath and harmonize your mind and body.',
      details: 'Our Other Packages include specialized pranayama classes and holistic wellness workshops.',
      flipped: false,
      label: 'Other Packages',
      path: 'yoga'
    }
  ];

  constructor(private router: Router,) { }

  flipImage(image: Image) {
    image.flipped = !image.flipped;
  }  

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
