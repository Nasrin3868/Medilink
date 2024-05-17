import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserloginComponent } from './components/shared/userlogin/userlogin.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { HomeComponent } from './components/home/home.component';
import { VerifyOtpComponent } from './components/shared/verify-otp/verify-otp.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
import { NewPasswordComponent } from './components/shared/new-password/new-password.component';
import { UserloginComponent } from './components/shared/userlogin/userlogin.component';
import { userLoggedOutGuard } from './guards/user-guard.guard';

const userRoutes:Routes=[
  {path:'userRegister',component:UserRegisterComponent,canActivate:[userLoggedOutGuard]},
  {path:'verify_email',component:VerifyEmailComponent,canActivate:[userLoggedOutGuard]},
  {path:'verify_otp',component:VerifyOtpComponent,canActivate:[userLoggedOutGuard]},
  {path:'registration_completed',redirectTo:'login'},
  {path:'new_password',component:NewPasswordComponent,canActivate:[userLoggedOutGuard]},
  {path: 'userprofile',redirectTo:'login'},
  {path:'login',component:UserloginComponent}
] 

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',redirectTo:''},
  {path:'user',children:userRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
