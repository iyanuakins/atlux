import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-cartbtn',
  templateUrl: './cartbtn.component.html',
  styleUrls: ['./cartbtn.component.css']
})
export class CartbtnComponent implements OnInit {
  cartLength: any;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    if (localStorage.getItem('cartItems')) {
      let len = JSON.parse(localStorage.getItem('cartItems')).length;
      this.homeService.updateCartCount(len, '')
    } else {
      this.homeService.updateCartCount(0, '')
    }
    this.homeService.cartLength.subscribe(cartLength => this.cartLength = cartLength);
  }

}
