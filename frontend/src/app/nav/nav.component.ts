import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(private router: Router, private toastr: ToastrService) { 
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
