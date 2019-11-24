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
  userName = '';
  constructor(private router:Router) {}
  ngOnInit()
  {
    this.userName = localStorage.getItem('userName');
    if(!localStorage.getItem('userID'))
    {
      this.router.navigateByUrl('/login');
    }
  }

  eraseSession()
  {
    alert('Confirm LogOut?');
    localStorage.removeItem('loginStatus')
    $.ajax({url:"http://localhost:5000/logout", method:"post", data:{"uID":localStorage.getItem('userID')}})
        .done((data)=>{
       
        if (data[0].userStatus=='OUT')
        {
          console.log('Log out on user action worked. DB updated.') 
          console.log(data);
          localStorage.removeItem('userID');
          localStorage.removeItem('userName');
        }
       })
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy()
  {
    
  }

}
