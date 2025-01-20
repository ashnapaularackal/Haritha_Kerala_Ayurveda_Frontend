import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPackageEditComponent } from './treatment-package-edit.component';

describe('TreatmentPackageEditComponent', () => {
  let component: TreatmentPackageEditComponent;
  let fixture: ComponentFixture<TreatmentPackageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentPackageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentPackageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
