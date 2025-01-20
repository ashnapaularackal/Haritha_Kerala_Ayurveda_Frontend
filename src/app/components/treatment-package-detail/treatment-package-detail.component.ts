import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreatmentPackageService } from '../../services/treatment-package.service';
import { TreatmentPackage } from '../../services/treatment-package.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatment-package-detail',
  templateUrl: './treatment-package-detail.component.html',
  styleUrls: ['./treatment-package-detail.component.css']
})
export class TreatmentPackageDetailComponent implements OnInit {
  package?: TreatmentPackage;
  isSidebarOpen = false;

  constructor(
    private route: ActivatedRoute,
    private treatmentPackageService: TreatmentPackageService,
    private router: Router
  ) {}

  additionalImages = [
    { url: 'assets/images/ayurveda1.jpg' },
    { url: 'assets/images/ayurveda2.jpg' },
    { url: 'assets/images/ayurveda3.jpg' }
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.treatmentPackageService.getPackageById(id).subscribe(
        (data) => {
          this.package = data;
        },
        (error) => {
          console.error('Error loading package', error);
        }
      );
    });
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
