import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
              '../style.css']
})
export class DashboardComponent implements OnInit {
  sidebar: Boolean;
  message: String = '';
  constructor(private router: Router,
              private userService: UserService) { }

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  ngOnInit() {
    if (this.userService.orderIsCompleted) {
      this.message = 'Order Completed';
      setTimeout(() => {
        this.message = '';
        this.userService.orderIsCompleted = false;
      }, 2000);
    }
  }

}
