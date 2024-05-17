import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserserviceService } from "src/app/services/userservice.service";
import { loginUser, loginUserSuccess} from "./user.Action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { MessageToasterService } from "src/app/services/message-toaster.service";
import { msg } from "../Model/usermodel";
import { Router } from "@angular/router";

// import { createEffect,Actions} from '@ngrx/effects';


// import { UserserviceService } from "src/app/services/userservice.service";

@Injectable()

export class usereffects{
    
    constructor(private action$:Actions,private userservice:UserserviceService,
         private showMessage:MessageToasterService,
        private router:Router
        ){}

        // _loaduser=createEffect(()=>
        //     this.action$.pipe(
        //         ofType(registeruser),
        //         exhaustMap((action)=>{
        //             console.log('effects')
        //             localStorage.setItem('email',action.inputdata.email); 
        //             localStorage.setItem('role','userRegistration')
        //             return this.userservice.userRegister(action.inputdata).pipe(
        //                 map((data)=>{
        //                     if (data && data.message) {
        //                         console.log(data.message);
        //                         this.router.navigate(['/userOtpVerify']);

        //                         this.showMessage.showSuccessToastr('Registered successfully');
        //                     }
        //                     return registerusersuccess({inputdata:action.inputdata});
        //                 }),
        //                 catchError((error)=>{
        //                     console.log(error.error.message)
        //                     this.showMessage.showErrorToastr(error.error.message);
        //                     return of(error.message)
        //                 })
        //             )
        //         })

                
        //     )
        // );

        _loginUser=createEffect(()=>
            this.action$.pipe(
                ofType(loginUser),
                exhaustMap((action)=>{
                    console.log('login effects')
                    return this.userservice.userLogin(action.data).pipe(
                        map((data)=>{
                            const userdata=data
                            if(userdata){
                                localStorage.setItem('userToken',userdata.accessToken)
                                this.showMessage.showSuccessToastr(userdata.message)
                                this.router.navigate(['/home'])  //page after login--->correct it
                                return loginUserSuccess({data:userdata.accessedUser})
                            }else{
                                return
                            }
                        }),
                        catchError((error)=>{
                            console.log('error',error)
                            console.log('error.error:',error.error)
                            console.log('error.error.message:',error.error.message)
                            this.showMessage.showErrorToastr(error.error.message)
                            return of(error.message)
                        })
                    )
                })
            )
        )

}




