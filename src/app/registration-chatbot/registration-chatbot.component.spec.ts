import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationChatbotComponent } from './registration-chatbot.component';

describe('RegistrationChatbotComponent', () => {
  let component: RegistrationChatbotComponent;
  let fixture: ComponentFixture<RegistrationChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
