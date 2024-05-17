
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserOtpPageComponent } from './user-otp-page/user-otp-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { VerifyEmailFpComponent } from './verify-email-fp/verify-email-fp.component';

const routes: Routes = [
  {
    path: '',
    component: UserDisplayComponent,
    children: [
      { path: '', component: UserLoginComponent },
      { path: 'userlogin', component: UserLoginComponent },
      {path: 'userRegistration',component:UserRegisterComponent},
      {path: 'userOtpVerify',component:UserOtpPageComponent},
      {path: 'userprofile',component:UserProfileComponent},
      {path: 'forgetpassword',component:VerifyEmailFpComponent},
      {path: 'newPassword',component:ForgetpasswordComponent},
      {path:'home',component:UserHomeComponent},
      // {path:'doctorlogin',loadChildren: () => import('').then(m => m.DoctorModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use `forChild` for feature modules
  exports: [RouterModule]
})
export class UserRoutingModule { }



// const routes: Routes = [

//     {
//         path: '',
//         children: [
//           { path: '', component: UserHomeComponent },
//           { path: 'userlogin', component: UserLoginComponent },
//         ]
//     }
//     // {path:'user/login',component:UserLoginComponent}
// //   {path: '',redirectTo:'/user/home',pathMatch:'full'},
  
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
