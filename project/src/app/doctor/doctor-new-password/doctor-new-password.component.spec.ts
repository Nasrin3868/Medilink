import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorNewPasswordComponent } from './doctor-new-password.component';

describe('DoctorNewPasswordComponent', () => {
  let component: DoctorNewPasswordComponent;
  let fixture: ComponentFixture<DoctorNewPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorNewPasswordComponent]
    });
    fixture = TestBed.createComponent(DoctorNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
