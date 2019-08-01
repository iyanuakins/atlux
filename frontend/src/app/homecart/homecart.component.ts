import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homecart',
  templateUrl: './homecart.component.html',
  styleUrls: ['./homecart.component.css']
})
export class HomecartComponent implements OnInit {
  checkoutGroup: FormGroup;
  cartItems: any;
  loader: Boolean;
  totalCost: Number;
  deslatitude: String;
  deslongitude: String;
  latitude: String;
  longitude: String;
  distance : String;

  constructor(private form: FormBuilder ,
              private homeService: HomeService,
              private authService: AuthService,
              private router: Router) { 
    this.checkoutGroup = this.form.group({
      pickUpDate: ['', Validators.required],
      pickUpTime: ['00:00', Validators.required],
      location: ['', Validators.required],
      destination: ['', Validators.required]
    })
  }

  removeItem (carId) {
    let confirmation = confirm("Are you sure?");
    if (confirmation == true) { 
      let removedIndex;
      let items = JSON.parse(localStorage.getItem('cartItems'));
      let newItems = items.filter((item) => {
            return item.carId !== carId;
      })
      localStorage.setItem('cartItems', JSON.stringify(newItems));

      this.cartItems.map((item, index) => {
        if (carId == item.carId) {
          removedIndex = index;
        }
      })
      this.cartItems.splice(removedIndex, 1);
      this.totalCost = this.cartItems.reduce((acc, item) => { 
        return acc += parseInt(item.carPrice)
      }, 0);
      if (this.totalCost == 0) {
        localStorage.removeItem('cartItems');
        this.cartItems = null;
      }
      this.homeService.updateCartCount('', 'decrease');
    }
  }

  checkout () {
    let pickUpTime = this.checkoutGroup.value.pickUpTime;
    let pickUpDate = this.checkoutGroup.value.pickUpDate;
    let destination = this.checkoutGroup.value.destination;
    let location = this.checkoutGroup.value.location;
    let checkoutData = {
      pickUpTime,
      pickUpDate,
      destination,
      location,
      distance : this.distance,
      username: '',
      totalCost: this.totalCost
    }
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    this.authService.isOrderLogin = true;
    this.router.navigate(['/auth']);
  }

  ngOnInit() { 
    this.loader = true;
        if (!!localStorage.getItem('cartItems')) {
          this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
          this.totalCost = this.cartItems.reduce((acc, item) => { 
          return acc += parseInt(item.carPrice)
          }, 0)
          this.loader = false;
        } else {
          this.cartItems = null;
          this.loader = false;
        }
}
  }

  
