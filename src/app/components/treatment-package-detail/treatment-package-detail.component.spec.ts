import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPackageDetailComponent } from './treatment-package-detail.component';

describe('TreatmentPackageDetailComponent', () => {
  let component: TreatmentPackageDetailComponent;
  let fixture: ComponentFixture<TreatmentPackageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentPackageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentPackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
