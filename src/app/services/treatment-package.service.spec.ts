import { TestBed } from '@angular/core/testing';

import { TreatmentPackageService } from './treatment-package.service';

describe('TreatmentPackageService', () => {
  let service: TreatmentPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
