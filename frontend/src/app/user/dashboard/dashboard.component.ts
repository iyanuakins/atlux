import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
              '../style.css']
})
export class DashboardComponent implements OnInit {
  private _opened: boolean = true;
  sidebar: boolean;
  constructor(private router: Router) { }

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  ngOnInit() {
  }

}
