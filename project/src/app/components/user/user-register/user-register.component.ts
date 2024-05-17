import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { user } from 'src/app/store/Model/usermodel';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private userService:UserserviceService,
    private store:Store,
    private showMessage:MessageToasterService,
  ){
  }

  user_registration_form!:FormGroup;
  title:string='Register your details'
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*\s*$/;

  ngOnInit(){
    this.user_registration()
  }

  close(){
    this.router.navigate(['/user/login'])
  }

  user_registration(){
    this.user_registration_form=this.formBuilder.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.pattern(this.namePattern)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.pattern(this.namePattern)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(this.passwordPattern)]],
      confirmPassword:['',Validators.required]
    })
  }

  onsubmit(){
    console.log('onsubmit entered',this.user_registration_form);
    const password = this.user_registration_form.get('password')?.value;
    if(this.user_registration_form.invalid){
      if(this.firstnameError()){
        this.showMessage.showErrorToastr(this.firstnameError())
      }
      if(this.lastnameError()){
        this.showMessage.showErrorToastr(this.lastnameError())
      }
      if(this.emailError()){
        this.showMessage.showErrorToastr(this.emailError())
      }
      if(this.passwordError()){
        this.showMessage.showErrorToastr(this.passwordError())
      }
      if(this.confirm_passwordError()){
        this.showMessage.showErrorToastr(this.confirm_passwordError())
      }
    }else{
      if (password != this.user_registration_form.get('confirmPassword')?.value) {
        this.showMessage.showErrorToastr('Passwords do not match')
        return; 
      }
      console.log('form submitted')
      const firstname=this.user_registration_form.get('firstname')?.value
      const data:user={
        firstname:this.user_registration_form.get('firstname' )?.value as String,
        lastname:this.user_registration_form.get('lastname' )?.value as String,
        email:this.user_registration_form.get('email' )?.value as string,
        password:this.user_registration_form.get('password' )?.value as String
      }

      console.log(firstname)
      console.log(data)
      
      this.userService.userRegister(data).subscribe({
        next:(response)=>{
          console.log("success responce registration")
          localStorage.setItem('email',data.email); 
          localStorage.setItem('role','userRegistration')
          console.log(data.message);
          this.router.navigate(['/user/verify_otp']);
          this.showMessage.showSuccessToastr('Registered successfully');
        },
        error:(error)=>{
          console.log(error.error.message)
          this.showMessage.showErrorToastr(error.error.message);
        }
      })
    }
  }


  //email error
  emailError():string{
    const email=this.user_registration_form.get('email')
    if(email?.errors?.['required']){
      return 'Email is required'
    }else if(email?.errors?.['email']){
      return 'Invalid Email'
    }
      return ''
  }

   //password Error

   passwordError():string{
    const password=this.user_registration_form.get('password')
      if(password?.errors?.['required']){
        return 'Password is required'
      }else if(password?.errors?.['pattern']){
        return 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (?@$!%*).'
      }
      return ''
    }

  //confirm password error
confirm_passwordError():string{
  const password=this.user_registration_form.get('confirmPassword')
  if(password?.errors?.['required']){
    return 'Password is required'
  }
  return ''
}

  // firstname error handling
  firstnameError(): string {
    const name = this.user_registration_form.get('firstname');

    if (name?.invalid) {
      if (name?.errors?.['required']) {
        return `First Name is required`;
      } else if (name.errors?.['minlength']) {
        return `First Name should contain minimum 2 letters`;
      } else if (name.errors?.['pattern']) {
        return `First Name is invalid`;
      }
    }
    return ``;
  }

  // lastname error handling
  lastnameError(): string {
    const name = this.user_registration_form.get('lastname');

    if (name?.invalid) {
      if (name?.errors?.['required']) {
        return `Last Name is required`;
      } else if (name?.errors?.['minlength']) {
        return `Last Name should contain minimum 2 letters`;
      } else if (name?.errors?.['pattern']) {
        return `Last Name is invalid`;
      }
    }
    return ``;
  }

}
