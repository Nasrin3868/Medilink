import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  email=this.commonService.getEmailFromLocalStrorage()

  constructor(
    private formBuilder:FormBuilder,
    private showMessage:MessageToasterService,
    private router:Router,
    private userService:UserserviceService,
    private commonService:CommonService
  ){}

  newPasswordForm=this.formBuilder.group({
    newPassword:['',[Validators.required,Validators.pattern(this.passwordPattern)]],
    confirmPassword:['',[Validators.required]]
  })


  onSubmit(){
    if(this.newPasswordForm.invalid){
      if(this.passwordError()){
        this.showMessage.showWarningToastr(this.passwordError())
      }
    }else{
      if(this.newPasswordForm.value.newPassword!==this.newPasswordForm.value.confirmPassword){
        this.showMessage.showErrorToastr('Passwords are not matching')
      }else{
        const data={
          email:this.email,
          password:this.newPasswordForm.value.newPassword,
        }
        this.userService.updatePassword(data).subscribe({
          next:(response)=>{
            localStorage.removeItem('email')
            this.showMessage.showSuccessToastr(response.message)
            this.router.navigate(['/user/login'])
          },
          error:(error)=>{
            this.showMessage.showErrorToastr(error.error.message)
          }
        })
      }
    }
  }

  passwordError():string{
    const password=this.newPasswordForm.get('newpassword')
      if(password?.errors?.['required']){
        return 'Password is required'
      }else if(password?.errors?.['pattern']){
        return 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (?@$!%*).'
      }
    
    return ''
  }

}
