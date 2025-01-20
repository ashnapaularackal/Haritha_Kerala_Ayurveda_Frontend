import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panchakarma-treatment',
  templateUrl: './panchakarma-treatment.component.html',
  styleUrl: './panchakarma-treatment.component.css'
})
export class PanchakarmaTreatmentComponent {
  constructor(private router: Router) { }
  navigateToRegister() {
    this.router.navigate(['/booking']);
  }

}
