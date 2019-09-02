import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css',
              './../style.css']
})
export class AdminUsersComponent implements OnInit {
  sidebar: Boolean;
  loader: Boolean;
  users: Object;
  user: Object;
  message: String;
  p: Number = 1;
  constructor(private adminService: AdminService,
              private toastr: ToastrService) { }

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }


  suspendUser(userID) {
    this.adminService.suspendUser({userID})
      .subscribe((res) => {
        if (res.success) {
          this.toastr.success('User suspended', 'Success', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            easing: 'ease-in'
          });
        } else {
          this.toastr.error('Unable to suspend user', 'Failed', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            easing: 'ease-in'
          });
        }
      })
  }

  getThisUser(userID) {
    this.adminService.getThisUser(userID)
      .subscribe((res) => {
        if (res.success) {
          if (res.user.details.lastBooking == '1970-01-01T00:00:00.000Z') {
            res.user.details.lastBooking = 0
          }
          this.user = res.user;
          document.getElementById('viewBtn').click();
        }
      })
  }

  ngOnInit() {
    this.loader = true;
    this.adminService.getAllUsers()
      .subscribe((res) => {
        if (res.success) {
          if (res.available) {
            this.users = res.users;
            this.loader = false;
          } else {
            this.users = [];
            this.loader = false;
          }
        } else {
          this.users = [];
          this.loader = false;
        }
      })
  }

}
