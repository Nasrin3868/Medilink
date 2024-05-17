import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserDisplayComponent } from './user-display/user-display.component';
import { UserOtpPageComponent } from './user-otp-page/user-otp-page.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { VerifyEmailFpComponent } from './verify-email-fp/verify-email-fp.component';



@NgModule({
  declarations: [
    UserFooterComponent,
    UserHeaderComponent,
    UserHomeComponent,
    UserProfileComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserDisplayComponent,
    UserOtpPageComponent,
    ForgetpasswordComponent,
    VerifyEmailFpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
