
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDisplayComponent } from './doctor-display/doctor-display.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { DoctorOtpPageComponent } from './doctor-otp-page/doctor-otp-page.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorEmailVerifyFpComponent } from './doctor-email-verify-fp/doctor-email-verify-fp.component';
import { DoctorNewPasswordComponent } from './doctor-new-password/doctor-new-password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorDisplayComponent,
    children: [
        { path: '', component:DoctorLoginComponent },
      { path: 'userlogin', component: DoctorLoginComponent },
      {path: 'userRegistration',component:DoctorRegisterComponent},
      {path: 'userOtpVerify',component:DoctorOtpPageComponent},
      {path: 'userprofile',component:DoctorProfileComponent},
      {path: 'forgetpassword',component:DoctorEmailVerifyFpComponent},
      {path: 'newPassword',component:DoctorNewPasswordComponent},
      {path:'home',component:HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use `forChild` for feature modules
  exports: [RouterModule]
})
export class DoctorRoutingModule { }




