 import { Component, OnInit } from '@angular/core';
import { TreatmentPackageService } from '../../services/treatment-package.service';
import { TreatmentPackage } from '../../services/treatment-package.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatment-package-list',
  templateUrl: './treatment-package-list.component.html',
  styleUrls: ['./treatment-package-list.component.css']
})
export class TreatmentPackageUserComponent implements OnInit {
  packages: TreatmentPackage[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];

  constructor(
    private treatmentPackageService: TreatmentPackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.treatmentPackageService.getAllPackages().subscribe(
      (data) => {
        this.packages = data;
      },
      (error) => {
        console.error('Error loading packages', error);
      }
    );
  }

  viewPackage(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/package', id]);
    }
  }

  addPackage(): void {
    this.router.navigate(['/add-package']);
  }
 
  dashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  editPackage(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/edit-package', id]);
    }
  }

  deletePackage(id?: number): void {
    if (id !== undefined) {
      this.treatmentPackageService.deletePackage(id).subscribe(
        () => {
          this.loadPackages();
        },
        (error) => {
          console.error('Error deleting package', error);
        }
      );
    }
  }
}
