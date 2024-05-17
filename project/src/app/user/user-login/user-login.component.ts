import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedFormService } from 'src/app/services/shared-form.service';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { Store } from '@ngrx/store';
import { loginUser } from 'src/app/store/user/user.Action';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  // emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com/;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  constructor( 
    private formbuilder: FormBuilder,
    private router:Router,
    private sharedFormGroup:SharedFormService,
    private showMessage:MessageToasterService,
    private store:Store
  ){}

  ngOnInit(){
      this.user_login()
  }

  user_login(){
    this.loginForm = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(this.passwordPattern)]]
    });
  }

  forgetPassword(){
    this.router.navigate(['/forgetpassword'])
  }

    
  //email error
  emailError():string{
    const email=this.loginForm.get('email')
    if(email?.errors?.['required']){
      return 'Email is required'
    }else if(email?.errors?.['email']){
      return 'Invalid Email'
    }
      return ''
  }

   //password Error

   passwordError():string{
    const password=this.loginForm.get('password')
      if(password?.errors?.['required']){
        return 'Password is required'
      }else if(password?.errors?.['pattern']){
        return 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (?@$!%*).'
      }
    
    return ''
  }

  //form submission
  onSubmit(){
    console.log('email:',this.loginForm.value.email)
    if(this.loginForm.invalid){
      console.log("invalid form")
      if(this.emailError()){
        //email error
        this.showMessage.showWarningToastr(this.emailError())
      }else if(this.passwordError()){
        //password error
        this.showMessage.showWarningToastr(this.passwordError())
      }
    }else{
      //valid loginform
      console.log("valid form")
      const data={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this.store.dispatch(loginUser({data}))
    }
  }
  

  user_registeration(){
    this.router.navigate(['/userRegistration'])
  }
}
