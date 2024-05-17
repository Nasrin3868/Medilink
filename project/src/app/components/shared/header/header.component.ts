import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  check_user!:boolean;
  constructor(
    private commonService:CommonService
  ){}
  ngOnInit(){
    // localStorage.removeItem('userToken')

    this.check_user=this.commonService.user_verify()
    console.log('this.check_user:',this.check_user)
  }

}


