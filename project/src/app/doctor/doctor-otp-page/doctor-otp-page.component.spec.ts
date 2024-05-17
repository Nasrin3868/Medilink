import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOtpPageComponent } from './doctor-otp-page.component';

describe('DoctorOtpPageComponent', () => {
  let component: DoctorOtpPageComponent;
  let fixture: ComponentFixture<DoctorOtpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorOtpPageComponent]
    });
    fixture = TestBed.createComponent(DoctorOtpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
