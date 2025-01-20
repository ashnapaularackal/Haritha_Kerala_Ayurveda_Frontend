import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPackageAdminViewComponent} from './treatment-package-admin-view.component'

describe('TreatmentPackageDetailComponent', () => {
  let component: TreatmentPackageAdminViewComponent ;
  let fixture: ComponentFixture<TreatmentPackageAdminViewComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentPackageAdminViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentPackageAdminViewComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
