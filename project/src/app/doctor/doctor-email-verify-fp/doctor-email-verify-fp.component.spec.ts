import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEmailVerifyFpComponent } from './doctor-email-verify-fp.component';

describe('DoctorEmailVerifyFpComponent', () => {
  let component: DoctorEmailVerifyFpComponent;
  let fixture: ComponentFixture<DoctorEmailVerifyFpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorEmailVerifyFpComponent]
    });
    fixture = TestBed.createComponent(DoctorEmailVerifyFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
