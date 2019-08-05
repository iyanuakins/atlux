import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css',
              './../style.css']
})
export class AdminDashboardComponent implements OnInit {
  sidebar: Boolean;
  constructor(private adminService: AdminService
              ) { }


  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }
  ngOnInit() {
  }

}
