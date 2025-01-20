import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPackageListComponent } from './treatment-package-list.component';

describe('TreatmentPackageListComponent', () => {
  let component: TreatmentPackageListComponent;
  let fixture: ComponentFixture<TreatmentPackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentPackageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
