import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeorder',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class HomeOrderComponent implements OnInit {

  sidebar: Boolean;
  carData: Object;
  carViewData: Object;
  reviews: Object;
  cartMessage: String;
  loader: Boolean = false;
  constructor(private router: Router,
              private homeService: HomeService) { }

  carView(carId) {
    this.homeService.viewCar(carId).subscribe((res) => {
      this.carViewData = res[0];
      this.reviews = res[1];
      document.getElementById('viewBtn').click();
    })
  }

  addToCart(carId, carImage, carBrand, carModel, carColour, carPrice) {
    this.loader = true;
    var cartItems = [];
    let data = {
      carId,
      carImage,
      carBrand,
      carModel,
      carColour,
      carPrice
    }

    if (!localStorage.getItem('cartItems')) {
      cartItems.push(data);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.loader = false;
      this.cartMessage ='Successfully added to cart';
      this.homeService.updateCartCount('', 'increase');
      setTimeout(() => {
        this.cartMessage=''
      }, 1000);
    } else {
      cartItems = JSON.parse(localStorage.getItem('cartItems'));
      let exist = cartItems.find((item) => {
        return item.carId == data.carId;
      })
      if (exist) {
        this.loader = false;
        this.cartMessage ='Car previously added to cart';
        setTimeout(() => {
          this.cartMessage=''
        }, 1000);
      } else {
        cartItems.push(data)
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.loader = false;
      this.cartMessage ='Successfully added to cart';
      this.homeService.updateCartCount('', 'increase');
      setTimeout(() => {
        this.cartMessage=''
      }, 1000);
      }
      
    }
  }
  
  addAndCheckout(carId, carImage, carBrand, carModel, carColour, carPrice) {
    this.loader = true;
    var cartItems = [];
      let data = {
        carId,
        carImage,
        carBrand,
        carModel,
        carColour,
        carPrice
      }

    if (!localStorage.getItem('cartItems')) {
      cartItems.push(data);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.homeService.updateCartCount('', 'increase');
      this.loader = false;
      this.router.navigate(['/cart']);
    } else {
      cartItems = JSON.parse(localStorage.getItem('cartItems'));
      let exist = cartItems.find((item) => {
        return item.carId == data.carId;
      })
      if (exist) {
        this.loader = false;
        this.router.navigate(['/cart']);
      } else {
        cartItems.push(data)
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.homeService.updateCartCount('', 'increase');
        this.loader = false;
        this.router.navigate(['/cart']);
      }
      
    }
  }

  ngOnInit() {
    this.carData = this.homeService.cars;
    if (!this.carData) {
      this.router.navigate(['/'])
    }
  }

}