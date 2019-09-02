import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  userRank: Number;
  userType: String;
  p: Number = 1;
  constructor(private router: Router,
              private userService: UserService,
              private toastr: ToastrService) { }

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
      carId,
      carPrice: 0
    }
    this.userService.addToCart(data).subscribe((res) => {
      if (res.success && res.status == 'new') {
        this.userService.updateCartCount('', 'increase');
        this.loader = false;
        this.toastr.success('Successfully added to cart', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      } else if (res.success && res.status == 'old') {
        this.loader = false;
        this.toastr.info('Car previously added to cart', 'Info', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      } else {
        this.loader = false;
        this.toastr.error('Failed to add to cart', 'Failed', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
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
        if (res.status == 'new') {
        this.userService.updateCartCount('', 'increase');
        this.router.navigate(['/user/cart'])
        } else {
          this.router.navigate(['/user/cart'])
        }
      } else {
        this.loader = false;
        this.toastr.error('Failed to add to cart', 'Failed', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    })
  }

  ngOnInit() { 
    this.userRank = this.userService.userRank;
    this.userType = this.userService.userType;
    this.carData = this.userService.cars;
    if(!this.carData) {
     this.router.navigate(['/user']);
    }
  }

}
