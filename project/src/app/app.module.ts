import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGModule } from './primeng.module';
import { UserModule } from './user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './store/user/user.Reducer';
import { usereffects } from './store/user/user.Effects';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
// import { UserloginComponent } from './components/shared/userlogin/userlogin.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
import { VerifyOtpComponent } from './components/shared/verify-otp/verify-otp.component';
import { NewPasswordComponent } from './components/shared/new-password/new-password.component';
import { UserloginComponent } from './components/shared/userlogin/userlogin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserloginComponent,
    UserRegisterComponent,
    HeaderComponent,
    FooterComponent,
    VerifyEmailComponent,
    VerifyOtpComponent,
    NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({user:userReducer}, {}),
    EffectsModule.forRoot([usereffects]),
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
