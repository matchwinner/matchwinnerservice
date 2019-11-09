import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup ({
    userid: new FormControl(),
    password: new FormControl(),
  });

  errmsg='';
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  public nameResolver()
  {
    return this.loginForm.value.userid;
  }
  onSubmit(){
    let uid=this.loginForm.value.userid;
    let pwd=this.loginForm.value.password;
    // $.ajax({url:"http://192.168.0.5:8080/login", method:"post", data:{"empID":uid,"pass":pwd}})
    // .done((data, status)=>{
    //   if (data.status==="Valid user")
    //   {
    //     // this.errmsg=data.status;
    //     this.router.navigateByUrl("/indent");
    //   } else {
    //     this.loginForm.value.userid;
    //     this.loginForm.value.password;
    //     this.errmsg = 'Invalid Credentials...!!!';
    //   }
    //   console.log(status, data);
    // })
    
  }

}













// if(uid!=pwd)
    // {
    //   this.errmsg='Invalid Login';
    //   console.log(this.errmsg);
    // }
    // this.obj.httpClient.post("http://localhost:8080/login",{"empID":uid,"pass":pwd})
    // .subscribe(data=>{console.log("POST request is successful",data)})