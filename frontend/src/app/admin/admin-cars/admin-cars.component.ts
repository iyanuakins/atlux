import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css',
              './../style.css']
})
export class AdminCarsComponent implements OnInit {

  sidebar: Boolean;
  loader: Boolean;
  drivers: Object;
  constructor(private adminService: AdminService) { }


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