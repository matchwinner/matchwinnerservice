import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router:Router) {}

  ngOnInit()
  {
    if(!localStorage.getItem('userID'))
    {
      this.router.navigateByUrl('/login');
    }
  }

  eraseSession()
  {
    alert('Confirm LogOut?');
    sessionStorage.removeItem('loginStatus')
    $.ajax({url:"http://localhost:5000/pageLoad", method:"post", data:{"uID":localStorage.getItem('userID')}})
        .done((data)=>{
       
        if (data[0].userStatus=='OUT')
        {
          console.log('Log out on user action worked. DB updated.') 
          console.log(data);
          localStorage.removeItem('userID');
        }
       })
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy()
  {
    
  }

}
