import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TreatmentPackageService } from '../../services/treatment-package.service';
import { TreatmentPackage } from '../../services/treatment-package.model';

@Component({
  selector: 'app-treatment-package-edit',
  templateUrl: './treatment-package-edit.component.html',
  styleUrls: ['./treatment-package-edit.component.css']
})
export class TreatmentPackageEditComponent implements OnInit {
  packageForm: FormGroup;
  isEdit = false;
  packageId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private treatmentPackageService: TreatmentPackageService
  ) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      timeSlots: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.packageId = +params['id'];
        this.isEdit = true;
        this.loadPackage(this.packageId);
      }
    });
  }

  loadPackage(id: number): void {
    this.treatmentPackageService.getPackageById(id).subscribe(
      (data: TreatmentPackage) => {
        this.packageForm.patchValue({
          name: data.name,
          description: data.description,
          price: data.price
        });
        this.setTimeSlots(data.timeSlots);
        this.setImages(data.images);
      },
      (error) => {
        console.error('Error loading package', error);
      }
    );
  }

  get timeSlots(): FormArray {
    return this.packageForm.get('timeSlots') as FormArray;
  }

  get images(): FormArray {
    return this.packageForm.get('images') as FormArray;
  }

  setTimeSlots(timeSlots: any[]): void {
    const timeSlotFGs = timeSlots.map(slot => this.fb.group({
      id: slot.id, // Ensure each time slot has an id property if needed
      startTime: [slot.startTime, Validators.required],
      endTime: [slot.endTime, Validators.required]
    }));
    const timeSlotFormArray = this.fb.array(timeSlotFGs);
    this.packageForm.setControl('timeSlots', timeSlotFormArray);
  }

  setImages(images: any[]): void {
    const imageFGs = images.map(image => this.fb.group({
      id: image.id, // Ensure each image has an id property
      url: [image.url, Validators.required]
    }));
    const imageFormArray = this.fb.array(imageFGs);
    this.packageForm.setControl('images', imageFormArray);
  }

  addTimeSlot(): void {
    this.timeSlots.push(this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    }));
  }

  addImage(): void {
    this.images.push(this.fb.group({
      url: ['', Validators.required]
    }));
  }

  removeTimeSlot(index: number): void {
    this.timeSlots.removeAt(index);
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  savePackage(): void {
    const treatmentPackage: TreatmentPackage = this.packageForm.value;
    if (this.isEdit && this.packageId) {
      treatmentPackage.id = this.packageId;
    }

    this.treatmentPackageService.updatePackage(this.packageId!, treatmentPackage).subscribe(
      () => {
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error('Error saving package', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}
