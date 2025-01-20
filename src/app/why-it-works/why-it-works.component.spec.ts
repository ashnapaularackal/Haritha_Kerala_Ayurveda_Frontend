import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyItWorksComponent } from './why-it-works.component';

describe('WhyItWorksComponent', () => {
  let component: WhyItWorksComponent;
  let fixture: ComponentFixture<WhyItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyItWorksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
