import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: String;
  cartItems: any;
  userCartItems: any;
  cartLength: Number;

  constructor(private router: Router,
              private auth: AuthService,
              private userService: UserService) { 

  }

  navigateToProfile () {
    this.router.navigate(['user/profile'])
  }

  navigateToCart () {
      this.router.navigate(['/user/cart'])
  }

  logout () {
    this.auth.logout();
  }

  ngOnInit() {
    this.loggedUser = this.userService.loggedUser;

    this.userService.validateUsers()
      .subscribe((res) => {
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 500) {
              this.auth.logout();
            }
          }
        }
      
    })


    this.userService.CartItems.subscribe(cartItems => this.cartItems = cartItems);
    this.userService.countCart().subscribe((res) => {
      if (res.count >= 1) { 
        this.userService.updateCartCount(res.count, '')
      } else {
        this.userService.updateCartCount('0', '')
      }
    });
  }

}
