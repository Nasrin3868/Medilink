import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  constructor(
    private formbuilder:FormBuilder,
    private showMessage:MessageToasterService,
    private userservice:UserserviceService,
    private router:Router,
    private commonService:CommonService,
  ){}

  verifyEmailForm=this.formbuilder.group({
    email:['',[Validators.required,Validators.email]]
  })

  onSubmit(){
    if(this.verifyEmailForm.invalid){
      if(this.emailError()){
        this.showMessage.showWarningToastr(this.emailError())
      }
    }else{
      const data={
        email:this.verifyEmailForm.value.email
      }
      localStorage.setItem('role','userForgetPassword')
      if(data.email){
        localStorage.setItem('email',data.email)
      }
      console.log('email:',data.email)
      this.userservice.verifyEmail(data).subscribe({
        next:(response)=>{
          this.showMessage.showSuccessToastr(response.message)
          this.router.navigate(['/user/verify_otp'])
        },
        error:(error)=>{
          console.log(error.error.message)
          this.showMessage.showErrorToastr(error.error.message)
        }
      })
    }
  }


  // email error
  emailError():string{
    const email=this.verifyEmailForm.get('email')
    if(email?.errors?.['required']){
      return 'Email is required'
    }else if(email?.errors?.['email']){
      return 'Invalid Email'
    }
      return ''
  }
}
