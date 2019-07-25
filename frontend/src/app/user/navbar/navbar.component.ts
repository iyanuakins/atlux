import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: String;
  cartItems: Number;
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
      this.router.navigate(['user/cart'])
  }

  logout () {
    this.auth.logout();
  }

  ngOnInit() {
    this.loggedUser = this.userService.loggedUser;

    //this.cartItems = this.userService.cartItems;
    this.userService.countCart().subscribe((res) => {
      if (res.count >= 1) {
        this.cartItems = res.count;
      }
    })
  }

}
