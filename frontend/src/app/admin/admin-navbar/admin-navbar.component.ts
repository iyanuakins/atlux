import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  loggedUser: String;
  userType: String;
  constructor(private router: Router,
              private auth: AuthService,
              private userService: UserService) { }

  logout () {
    this.auth.logout();
  }

  ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
    this.userType = this.userService.userType;
    if (this.userType === 'client') {
      this.router.navigate(['/user']);
    }
  }
}
