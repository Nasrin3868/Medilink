import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  timerInterval: any;
  counter: number = 59;
  otpPattern = /^[0-9]+$/;
  email=this.commonservice.getEmailFromLocalStrorage()
  role=this.commonservice.getRoleFromLocalStorage()


  constructor(
    private formbuilder:FormBuilder,
    private commonservice:CommonService,
    private userService:UserserviceService,
    private showMessage:MessageToasterService,
    private router:Router,
  ){}

  ngOnInit(){
    this.counterFn();
  }


  otpForm = this.formbuilder.group({
    otp: ['', [Validators.required, Validators.pattern(this.otpPattern)]],
  });

  counterFn(){
    this.timerInterval=setInterval(()=>{
      this.counter--
      if(this.counter==0){
        clearInterval(this.timerInterval)
      }
    },1000)
  }

  resendClicked(){
    this.counter=59
    this.counterFn()
    this.userService.resendOtp({email:this.email}).subscribe({
      next:(response)=>{
        this.showMessage.showSuccessToastr(response.message)
        this.otpForm.reset()
      }
    })

  }

  onSubmit(){
        this.showMessage.showSuccessToastr("OTP submitted")

    if(this.otpForm.invalid){
      if(this.otpError()){
        this.showMessage.showErrorToastr(this.otpError())
      }
    }else{
      const otpdata={
        email:this.email,
        otp:this.otpForm.value.otp as string
      }
      console.log("otp response passage before service call",otpdata)

      this.userService.verifyOtp(otpdata).subscribe({
        
        next:(response)=>{
          console.log("role for otp:",this.role)
          if(this.role=='userRegistration'){
            console.log("otp response")
            //if it is user registration verification
            this.showMessage.showSuccessToastr(response.message)
            this.router.navigate(['/user/registration_completed'])
            localStorage.removeItem('email')
          }else if(this.role=='userForgetPassword'){
            //if it is password verification
            console.log("forget password")
            this.showMessage.showSuccessToastr(response.message)
            this.router.navigate(['/user/new_password'])
          }
        },
        error:(error)=>{
          console.log(error.error.message)
          this.showMessage.showErrorToastr(error.error.message);
        }
      })
    }
  }

  otpError():string{
    const otp=this.otpForm.get('otp')
    if(otp?.errors?.['required']){  
      return 'OTP is required'
    }else if(otp?.errors?.['pattern']){
      return 'Enter a valid OTP'
    }
    return ''
  }
}
