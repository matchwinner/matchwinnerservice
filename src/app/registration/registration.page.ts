import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  regForm = new FormGroup ({
    userName: new FormControl(),
    userEmail: new FormControl(),
    userMobile: new FormControl(),
    userPassword: new FormControl(),
    confPassword: new FormControl()
  });

  errmsg='';
  constructor(private router:Router) { }

  ngOnInit() {

  }

  onSubmit(){
    let uName=this.regForm.value.userName;
    let uMail=this.regForm.value.userEmail;
    let uMob=this.regForm.value.userMobile;
    let uPwd=this.regForm.value.userPassword;
    console.log(uName);
    console.log(uMail);
    console.log(uMob);
    console.log(uPwd);
    $.ajax({url:"http://localhost:5000/register", method:"post", data:{"uName":uName,"uMail":uMail,"uMob":uMob,"uPwd":uPwd}})
    .done((data)=>{
      console.log(data);
      if (data=="FOUND")
      {
        this.errmsg='User already exists';
        console.log(this.errmsg);
      }
       else if (data=="NOT FOUND") 
       {
            this.errmsg='Registration Successful';  
       }      
    })
  }

}
