import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css',
              '../style.css']
})
export class HistoryComponent implements OnInit {

  sidebar: Boolean;
  orders: Object;
  userRank: Number;
  userType: String;
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
    this.userRank = this.userService.userRank;
    this.userType = this.userService.userType;
    this.userService.getOrders().subscribe((res) => { 
      if (res.success) {
        if (res.available) {
          this.orders = res.orders;
        } else {
          this.orders = [];
        }
      } else {
        this.orders = [];
      }
    })
  }

}
