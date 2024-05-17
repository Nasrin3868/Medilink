import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailFpComponent } from './verify-email-fp.component';

describe('VerifyEmailFpComponent', () => {
  let component: VerifyEmailFpComponent;
  let fixture: ComponentFixture<VerifyEmailFpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailFpComponent]
    });
    fixture = TestBed.createComponent(VerifyEmailFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
