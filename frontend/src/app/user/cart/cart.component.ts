import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css',
              '../style.css']
})
export class CartComponent implements OnInit {

  sidebar: boolean;
  cartItems: any;
  loader: Boolean;

  constructor(private router: Router,
              private userService: UserService) { }

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
          //get removed item
          let itemToRemove = this.cartItems.filter((item) => {
            res.removedItem.cartId == item.cartId
          })
          console.log(itemToRemove);
          
          //remove from total cart items
          this.cartItems.splice(itemToRemove, 1);
          //Update Cart items counts on cart badge
          this.userService.getUserCart().subscribe((res) => {
            this.cartItems = res.cart;
            this.userService.newCartCount = res.cart.length;
          })
        }
      })
    } else {
      //console.log('rejected');
    }
  }

  

  ngOnInit() { 
    this.cartItems = this.userService.userCartItems;
    console.log(this.cartItems);
  }

}
