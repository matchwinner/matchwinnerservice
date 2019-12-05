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

  public validateEmail()
  {
    let uMail=this.loginForm.value.userid;
    $.ajax({url:"http://localhost:5010/validateEmail", method:"post", data:{"uMail":uMail}})
    .done((data)=>{
      console.log(data);
      if (data.validationStatus==0)
          this.allowAccess();
      else  if(data.validationStatus==1)
          this.errmsg = 'Please enter an email ID';
      else if(data.validationStatus==2)
          this.errmsg = 'Please Enter a valid email ID';    
    })

  }


  public allowAccess()
  {
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
          localStorage.setItem('userID',data[0].userID);
          localStorage.setItem('userName',data[0].userName);
          localStorage.setItem('loginStatus',data[0].userStatus);
          if(localStorage.getItem('loginStatus')=='IN')
          {
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
  onSubmit(){
    this.validateEmail();
  }

}
