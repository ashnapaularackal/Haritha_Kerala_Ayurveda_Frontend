// landing.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.landing-header').textContent).toContain('Welcome to Haritha Kerala Ayurveda and Yoga Centre');
  });

  it('should render content', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.landing-content').textContent).toContain('Where ancient wisdom meets modern healing');
  });

  it('should render images', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.landing-image').length).toBe(3);
  });

  it('should render footer', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.landing-footer').textContent).toContain('© 2024 Haritha Kerala Ayurveda and Yoga Centre');
  });
});
