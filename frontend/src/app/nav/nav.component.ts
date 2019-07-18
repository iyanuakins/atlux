import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(private router: Router) { 
  }

  

  navigateToLogin () {
    this.router.navigate(['auth'], {fragment: 'login'})
  }

  navigateToRegister () {
    this.router.navigate(['auth'], {fragment: 'register'})
  }

  ngOnInit() {
  }

}
