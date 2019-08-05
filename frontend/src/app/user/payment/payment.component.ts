import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css',
              '../style.css']
})
export class PaymentComponent implements OnInit {
  sidebar: Boolean;
  loader: Boolean;
  cartItems: any;
  totalCost: Number;
  checkoutData: Object;
  hasOrderFailed: Boolean;
  failedMessage: String = '';
  userRank: Number;
  userType: String;
  constructor(private userService: UserService,
              private router: Router) {}

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  makePayment () {
    let checkoutData = JSON.parse(localStorage.getItem('checkoutData'))
   let {pickUpTime, pickUpDate, location, destination} = checkoutData;
    let data = {
      pickUpDate,
      pickUpTime,
      location,
      destination,
      KM: 10,
      username: this.userService.loggedUser
    }

    this.userService.makePayment(data).subscribe((res) => {
      if (res.success) {
        this.userService.orderIsCompleted = true;
        localStorage.removeItem('checkoutData');
        this.router.navigate(['user']);
      } else { 
        this.failedMessage = 'Something went wrong! Unable to complete order';
        setTimeout(() => {
          this.failedMessage = '';
        }, 2000);
      }
    })
  }

  ngOnInit() {
    this.loader = true;
    this.userRank = this.userService.userRank;
    this.userType = this.userService.userType;
    this.userService.getUserCart().subscribe((res) => {
        if (res.success) {
          this.cartItems = res.cart;
          this.totalCost = res.cart.reduce((acc, item) => { 
          return acc += parseInt(item.carPrice)
          }, 0)
          this.checkoutData = JSON.parse(localStorage.getItem('checkoutData'))
          this.loader = false;
        } else {
          this.cartItems = null;
          this.router.navigate(['user/cart']);
          this.loader = false;
        }
    })
  }


}
