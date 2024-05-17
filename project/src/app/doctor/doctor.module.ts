import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDisplayComponent } from './doctor-display/doctor-display.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { DoctorOtpPageComponent } from './doctor-otp-page/doctor-otp-page.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorEmailVerifyFpComponent } from './doctor-email-verify-fp/doctor-email-verify-fp.component';
import { DoctorNewPasswordComponent } from './doctor-new-password/doctor-new-password.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DoctorDisplayComponent,
    DoctorLoginComponent,
    DoctorRegisterComponent,
    DoctorOtpPageComponent,
    DoctorProfileComponent,
    DoctorEmailVerifyFpComponent,
    DoctorNewPasswordComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DoctorModule { }
