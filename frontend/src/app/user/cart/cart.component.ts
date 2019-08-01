import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css',
              '../style.css']
})

export class CartComponent implements OnInit {
  checkoutGroup: FormGroup;
  sidebar: Boolean;
  cartItems: any;
  loader: Boolean;
  totalCost: Number;
  deslatitude: String;
  deslongitude: String;
  latitude: String;
  longitude: String;
  distance : String;

  constructor(private form: FormBuilder ,
              private userService: UserService,
              private router: Router) { 
    this.checkoutGroup = this.form.group({
      pickUpDate: ['', Validators.required],
      pickUpTime: ['00:00', Validators.required],
      location: ['', Validators.required],
      destination: ['', Validators.required]
    })
}

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  removeItem (cartId) {
    let confirmation = confirm("Are you sure?");
    if (confirmation == true) { 
      this.userService.removeItem(cartId).subscribe((res) => {
        if (res) { 
          let removedIndex;
          this.cartItems.map((item, index) => {
            if (res.removedItem._id == item.cartId) {
              removedIndex = index;
            }
          });
          this.cartItems.splice(removedIndex, 1);
          this.totalCost = this.cartItems.reduce((acc, item) => { 
            return acc += parseInt(item.carPrice)
          }, 0);
          if (this.totalCost == 0) {
            this.cartItems = null;
          }
          this.userService.updateCartCount('', 'decrease');
        }
      });
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
      username: this.userService.loggedUser,
      totalCost: this.totalCost
    }
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    this.router.navigate(['user/checkout/payment']);
  }

  // calculateDistance () {
  //   let destination = this.checkoutGroup.value.destination;
  //   let location = this.checkoutGroup.value.location;
  //   if (destination == '' || location == '') {
      
  //   } else {
  //         if (destination == 'utako') {
  //         this.deslatitude = "9.071520";
  //         this.deslongitude = "7.444130";
  //       } else if (destination == 'apo') {
  //         this.deslatitude = "9.013410";
  //         this.deslongitude = "7.491150";
  //       } else if (destination == 'gwagwalada') {
  //         this.deslatitude = "8.942300";
  //         this.deslongitude = "7.082970";
  //       } else if (destination == 'projaro') {
  //         this.deslatitude = "9.059530";
  //         this.deslongitude = "7.469260";
  //       } else if (destination == 'lugbe') {
  //         this.deslatitude = "8.974314";
  //         this.deslongitude = "7.374914";
  //       } else if (destination == 'asokoro') {
  //         this.deslatitude = "9.013410";
  //         this.deslongitude = "7.491150";
  //       } else if (destination == 'garki') {
  //         this.deslatitude = "9.035340";
  //         this.deslongitude = "7.477030";
  //       } 

  //       if (location == 'utako') {
  //         this.latitude = "9.071520";
  //         this.longitude = "7.444130";
  //       } else if (location == 'apo') {
  //         this.latitude = "9.013410";
  //         this.longitude = "7.491150";
  //       } else if (location == 'gwagwalada') {
  //         this.latitude = "8.942300";
  //         this.longitude = "7.082970";
  //       } else if (location == 'projaro') {
  //         this.latitude = "9.059530";
  //         this.longitude = "7.469260";
  //       } else if (location == 'lugbe') {
  //         this.latitude = "8.974314";
  //         this.longitude = "7.374914";
  //       } else if (location == 'asokoro') {
  //         this.latitude = "9.013410";
  //         this.longitude = "7.491150";
  //       } else if (location == 'garki') {
  //         this.latitude = "9.035340";
  //         this.longitude = "7.477030";
  //       }

        
  //       this.userService.getDistance(this.latitude, this.longitude, this.deslatitude, this.deslongitude).subscribe((data) => {
  //         console.log(data);
  //     })
  //   }
  // }

  ngOnInit () { 
    this.loader = true;
    this.userService.getUserCart().subscribe((res) => {
        if (res.success) {
          this.cartItems = res.cart;
          this.totalCost = res.cart.reduce((acc, item) => { 
          return acc += parseInt(item.carPrice)
          }, 0)
          this.loader = false;
        } else {
          this.cartItems = null;
          this.loader = false;
        }
    })
  }

}