import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css',
              './../style.css']
})
export class AdminDashboardComponent implements OnInit {
  sidebar: Boolean;
  orders: Object;
  loader: Boolean;
  totalCars: Number;
  users: Object;
  totalDrivers: Number;
  totalUsers: Number;
  constructor(private adminService: AdminService
              ) { }


  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  //viewUsers

  ngOnInit() {
    this.loader = true;
    this.adminService.getCarCount()
      .subscribe((res) => {
        if (res.success) {
          this.totalCars = res.totalCars
        }
      })
      
    this.adminService.getDriverCount()
      .subscribe((res) => {
        if (res.success) {
          this.totalDrivers = res.totalDrivers
        }
      })

    this.adminService.getUserCount()
      .subscribe((res) => {
        if (res.success) {
          this.totalUsers = res.totalUsers
        }
      })
      
    this.adminService.getLastUsers()
      .subscribe((res) => {
        if (res.success) {
          if (res.available) {
            this.users = res.users;
          } else {
            this.users = [];
          }
        } else {
          this.users = [];
          }
        })

    this.adminService.getLastOrders()
      .subscribe((res) => {
        if (res.success) {
          if (res.available) {
            this.orders = res.orders;
          } else {
            this.orders = [];
          }
          this.loader = false;
        } else {
          this.orders = [];
          this.loader = false;
          }
        })
  }

}
