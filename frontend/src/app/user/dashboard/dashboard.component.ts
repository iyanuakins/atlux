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
  loader: Boolean;
  userRank: Number;
  userType: String;
  orders: Object;
  completedOrders: Number;
  pendingOrders: Number;
  processedOrders: Number;
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
    this.loader = true;
    if (this.userService.orderIsCompleted) {
      this.loader = false;
      this.message = 'Order Completed';
      setTimeout(() => {
        this.message = '';
        this.userService.orderIsCompleted = false;
      }, 2000);
    }

    if (!!localStorage.getItem('cartItems') && !!localStorage.getItem('checkoutData')) {
      let checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
      checkoutData.username = this.userService.loggedUser;
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      let carts = JSON.parse(localStorage.getItem('cartItems'));
      this.userService.transferCartItems(carts).subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('cartItems');
          this.router.navigate(['user/checkout/payment']);
          this.loader = false;
        }
      });
    } else if (!!localStorage.getItem('cartItems')) {
      let carts = JSON.parse(localStorage.getItem('cartItems'));
      this.userService.transferCartItems(carts).subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('cartItems');
          this.router.navigate(['user/checkout/payment']);
          this.loader = false;
        }
      });
    }

    this.userService.getLastOrders()
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

    this.userService.getOrders()
      .subscribe((res) => { 
        if (res.success) {
          if (res.available) { 
            this.completedOrders = res.orders.filter((order) => {
              return order.status === 'completed';
            }).length;
            this.pendingOrders = res.orders.filter((order) => {
              return order.status === 'pending';
            }).length;
            this.processedOrders = res.orders.filter((order) => {
              return order.status === 'processed';
            }).length;
          } else {
          this.completedOrders = 0;
          this.pendingOrders = 0;
          this.processedOrders = 0;
          }
          this.loader = false;
        } else {
          this.completedOrders = 0;
          this.pendingOrders = 0;
          this.processedOrders = 0;
          this.loader = false;
        }
      })
  }

}
