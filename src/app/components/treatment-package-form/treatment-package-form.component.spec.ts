import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPackageFormComponent } from './treatment-package-form.component';

describe('TreatmentPackageFormComponent', () => {
  let component: TreatmentPackageFormComponent;
  let fixture: ComponentFixture<TreatmentPackageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentPackageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentPackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
