import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quickOrderGroup : FormGroup;
  catSelected: string = "";
  carBrands: Object;
  carTypes: Object;
  randomCars: Object;
  carViewData: Object;
  reviews: Object;
  loader: Boolean;
  cartMessage: String;
  constructor(private form: FormBuilder,
              private homeService: HomeService,
              private router: Router) { 
      this.quickOrderGroup = this.form.group({
        pickUpDate: ['', Validators.required],
        pickUpTime: ['00:00', Validators.required],
        dropOffTime: ['00:00', Validators.required],
        category: ['all', Validators.required],
        type: ['suv', Validators.required],
        maker: ['lexus', Validators.required]
      });
      
   }

  carView(carId) {
    this.homeService.viewCar(carId).subscribe((res) => {
      this.carViewData = res[0];
      this.reviews = res[1];
      document.getElementById('viewBtn').click();
    })
  }

  category () {
     if (this.quickOrderGroup.value.category == 'type') {
      return this.catSelected = "type";
     } else if (this.quickOrderGroup.value.category == 'maker') {
      return this.catSelected = "maker";
    } else {
      return this.catSelected = "";
    }
  } 
   
   onSubmit() {
    // let orderData = {pickUpTime: this.orderGroup.value.pickUpTime,
    //                   pickUpDate: this.orderGroup.value.pickUpDate,
    //                   dropOffTime: this.orderGroup.value.dropOffTime,
    //                   dropOffDate: this.orderGroup.value.dropOffDate}
    // localStorage.setItem('orderData', JSON.stringify(orderData))

    let category = this.quickOrderGroup.value.category
    let type = this.quickOrderGroup.value.type
    let brand = this.quickOrderGroup.value.maker
    if (category == "type") {
      this.homeService.getCarsByType(type).subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order']);
      })
    } else if (category == "maker") {
      this.homeService.getCarsByBrand(brand).subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order']);
      })
    } else if (category == "all") {
      this.homeService.getCars().subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order']);
      })
    }
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
    this.homeService.getCarBrands().subscribe((res) => {
      this.carBrands = res;
    });

    this.homeService.getCarTypes().subscribe((res) => {
      this.carTypes = res;
    });

    this.homeService.getRandomCars().subscribe((res) => {
      this.randomCars = res.cars;
    });
  }

}
