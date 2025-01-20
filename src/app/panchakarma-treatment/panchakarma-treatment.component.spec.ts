import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchakarmaTreatmentComponent } from './panchakarma-treatment.component';

describe('PanchakarmaTreatmentComponent', () => {
  let component: PanchakarmaTreatmentComponent;
  let fixture: ComponentFixture<PanchakarmaTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanchakarmaTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanchakarmaTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
