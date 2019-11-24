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
  constructor() { }

  ngOnInit() {

  }

  onSubmit(){
    
  }

}
