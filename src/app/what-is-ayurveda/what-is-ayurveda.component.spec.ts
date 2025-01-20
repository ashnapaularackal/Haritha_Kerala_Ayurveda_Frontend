import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsAyurvedaComponent } from './what-is-ayurveda.component';

describe('WhatIsAyurvedaComponent', () => {
  let component: WhatIsAyurvedaComponent;
  let fixture: ComponentFixture<WhatIsAyurvedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatIsAyurvedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIsAyurvedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
