import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { user } from 'src/app/store/Model/usermodel';
// import { registeruser } from 'src/app/store/user/user.Action';

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
  errorMessage: string = '';
  passworderr!:string;
  emailerr!:string;
  title:string='Register your details'

  ngOnInit(){
    this.user_registration()
  }

  close(){
    this.router.navigate(['/userlogin'])
  }

  user_registration(){
    this.user_registration_form=this.formBuilder.group({
      firstname:this.formBuilder.control('',Validators.required),
      lastname:this.formBuilder.control('',Validators.required),
      email:this.formBuilder.control('',Validators.compose([Validators.required,Validators.email])),
      password:this.formBuilder.control('',Validators.required),
      confirmPassword: this.formBuilder.control('',Validators.required),
    })
    
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.user_registration_form.get(controlName)?.hasError(errorName) ?? false;
  }

  onsubmit(){
    console.log('onsubmit entered',this.user_registration_form);
    const password = this.user_registration_form.get('password')?.value;
      if (password != this.user_registration_form.get('confirmPassword')?.value) {
        
        this.passworderr = 'Passwords do not match';
        return; 
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com/;
      const valid = emailPattern.test(this.user_registration_form.get('email')?.value);
      console.log('valid:', valid);
      if (!valid) {
        console.log('email err');
        this.emailerr = 'Email should be in abc@gmail.com format';
        return;
      }

      if(!this.user_registration_form.get('firstname')?.value||!this.user_registration_form.get('lastname')?.value||!this.user_registration_form.get('email')?.value||!this.user_registration_form.get('password')?.value||!this.user_registration_form.get('confirmPassword')?.value){
        this.errorMessage = 'Please fill in all required fields.';
        return;
      }
  
    if(this.user_registration_form.valid){
      this.errorMessage=''
      this.passworderr=''
      this.emailerr=''
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
          this.router.navigate(['/userOtpVerify']);
          this.showMessage.showSuccessToastr('Registered successfully');
        },
        error:(error)=>{
          console.log(error.error.message)
          this.showMessage.showErrorToastr(error.error.message);
        }
      })

      // this.store.dispatch(registeruser({inputdata:data}))
      // const obj:user{
      //   firstname:this.user_registration_form.get('firstname')?.value.toLowerCase()
      // }
      // this.userService.userRegister(formData).subscribe(() => {
      //   localStorage.setItem('email', formData.get('email') as string);
      //   localStorage.setItem('role', 'user');
      //   this.router.navigate(['/userlogin']);
      // })
    }

  }
      

}
