import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedFormService {
  fg!:FormGroup
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  constructor(private fb:FormBuilder) { }

  sharedForm():FormGroup{
    this.fg=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(this.passwordPattern)]]
    })
    return this.fg
  }

  //email error
  emailError():string{
    const email=this.fg.get('email')
    if(email?.invalid){
      if(email?.errors?.['required']){
        return 'Email is required'
      }else if(email?.errors?.['email']){
        return 'Invalid Email'
      }
    }
    return ''
  }

  //password Error

  passwordError():string{
    const password=this.fg.get('password')
    if(password?.invalid){
      if(password?.errors?.['required']){
        return 'Password is required'
      }else if(password?.errors?.['pattern']){
        return 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (?@$!%*).'
      }
    }
    return ''
  }


}
