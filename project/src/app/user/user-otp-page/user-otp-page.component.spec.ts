import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOtpPageComponent } from './user-otp-page.component';

describe('UserOtpPageComponent', () => {
  let component: UserOtpPageComponent;
  let fixture: ComponentFixture<UserOtpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOtpPageComponent]
    });
    fixture = TestBed.createComponent(UserOtpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
