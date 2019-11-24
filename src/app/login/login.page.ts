import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    loginForm = new FormGroup ({
    userid: new FormControl(),
    password: new FormControl()
  });
 errmsg='';
 //key = 'loginStatus';
  constructor(private navController: NavController, private router:Router) { 

  }

  ngOnInit() {
    this.errmsg='';
    if(localStorage.getItem('loginStatus')=='IN')
    {
      this.router.navigateByUrl('/tabs');
    }
  }

  public nameResolver()
  {
    return this.loginForm.value.userid;
  }
  onSubmit(){
    let uMail=this.loginForm.value.userid;
    let uPwd=this.loginForm.value.password;
    console.log(uMail);
    console.log(uPwd);
    $.ajax({url:"http://localhost:5000/login", method:"post", data:{"uMail":uMail,"uPwd":uPwd}})
    .done((data)=>{
      if (!data[0])
      {
        this.errmsg='Invalid Credentials';
        console.log(this.errmsg);
      }
       else 
       {
          //sessionStorage.setItem(this.key,data[0].userStatus);
          localStorage.setItem('userID',data[0].userID);
          localStorage.setItem('userName',data[0].userName);
          localStorage.setItem('loginStatus',data[0].userStatus);
          // localStorage.setItem('userName',data[0].userName);
          // localStorage.setItem(this.key,data[0].userStatus);
          if(localStorage.getItem('loginStatus')=='IN')
          {
            // this.loginForm.setValue('').userid.;
            // this.loginForm.value.password='';
            this.errmsg='';
            this.router.navigateByUrl('/tabs');
          }
          else if(localStorage.getItem('loginStatus')=='OUT')
          {
            this.errmsg='Please Login to continue'
          }
       }
       
        console.log(data[0]);
        console.log(data[0].userStatus);
    })
    
  }

}
