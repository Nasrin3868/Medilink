import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext'; // For [(ngModel)]
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
    constructor(private router:Router){
    console.log('usermodule loaded and userhome loaded')

    }

    userlogin(){
        this.router.navigate(["/userlogin"])
    }
}
