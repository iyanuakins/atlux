import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css',
              '../style.css']
})
export class OrderComponent implements OnInit {

  sidebar: Boolean;
  carData: Object;
  carViewData: Object;
  reviews: Object;
  cartMessage: String;
  loader: Boolean = false;
  constructor(private router: Router,
              private userService: UserService) { }

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  carView(carId) {
    this.userService.viewCar(carId).subscribe((res) => {
      this.carViewData = res[0];
      this.reviews = res[1];
      document.getElementById('viewBtn').click();
    })
  }

  addToCart(carId) {
    this.loader = true;
    let data = {
      username: this.userService.loggedUser,
      carId
    }
    this.userService.addToCart(data).subscribe((res) => {
      if (res.success && res.status == 'new') {
        this.userService.countCart().subscribe((res) => {
          if (res.count >= 1) {
            this.userService.newCartCount = res.count;
          }
        })
        this.loader = false;
        this.cartMessage ='Successfully added to cart';
        setTimeout(() => {
          this.cartMessage=''
        }, 1000);
      } else if (res.success && res.status == 'old') {
        this.loader = false;
        this.cartMessage ='Car previously added to cart';
        setTimeout(() => {
          this.cartMessage=''
        }, 1000);
      } else {
        this.loader = false;
        this.cartMessage ='Failed to add to cart';
        setTimeout(() => {
          this.cartMessage=''
        }, 1000);
      }
    })
  }

  addAndCheckout(carId) {
    this.loader = true;
      let data = {
        username: this.userService.loggedUser,
        carId
      }
    this.userService.addToCart(data).subscribe((res) => {
      if (res.success) {
      } else {
        this.loader = false;
        this.cartMessage ='Failed to add to Checkout';
        setTimeout(() => {
          this.cartMessage=''
        }, 1000);
      }
    })
  }

  ngOnInit() {
    this.carData = this.userService.cars;
    if(!this.carData) {
     this.router.navigate(['/user'])
    }
  }

}