import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel, loginResponseModel, user } from '../store/Model/usermodel';
import { Observable } from 'rxjs';
import { HttpResponseModel } from '../store/Model/commonModel';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  private api:String='http://localhost:3000'


  //register user
  userRegister(data:any):Observable<user> {
    console.log('userRegister services')
    return this.http.post<user>(`${this.api}/user/userregister`, data);
  }

  //resendotp
  resendOtp(email:Object):Observable<HttpResponseModel>{
    console.log('resend otp')
    return this.http.post<HttpResponseModel>(`${this.api}/user/resendOtp`,email)
  }

  //verifyOtp
  verifyOtp(data:Object):Observable<HttpResponseModel>{
    console.log('verify otp service')
    return this.http.post<HttpResponseModel>(`${this.api}/user/verifyOtp`,data)
    console.log('after otp response')
  }

  //login user
  userLogin(data:loginModel):Observable<loginResponseModel>{
    return this.http.post<loginResponseModel>(`${this.api}/user/login`,data)
  }

  //verifyEmail_Forgetpassword
  verifyEmail(data:Object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${this.api}/user/verifyEmail`,data)
  }

  //newPassword
  updatePassword(data:Object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${this.api}/user/updatePassword`,data)
  }
  
}
