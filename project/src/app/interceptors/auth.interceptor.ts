import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private commonService:CommonService) {}

  userToken!:string;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.userToken=this.commonService.getTokenFromLocalStorage()

    if(window.location.pathname.includes('/user') && this.userToken){
      console.log('User interceptor works!!!')
      console.log('userToken:',this.userToken)
      const userToken=this.userToken
      const authRequest=request.clone({
        setHeaders:{
          'Cotent-Type':'application/json',
          Authorization:`user-barrier ${userToken}`
        }
      })
      return next.handle(authRequest)
    }else{
      console.log('Normal interceptor works')
      return next.handle(request);
    }


  }
}
