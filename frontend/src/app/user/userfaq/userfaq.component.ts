import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userfaq',
  templateUrl: './userfaq.component.html',
  styleUrls: ['./userfaq.component.css',
              '../style.css']
})
export class UserfaqComponent implements OnInit {

  sidebar: boolean;
  userRank: Number;
  userType: String;
  constructor(private router: Router,
              private userService: UserService) { }

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }
  ngOnInit() { 
    this.userRank = this.userService.userRank;
    this.userType = this.userService.userType;
  }

}
