import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
sidebar: boolean;
  constructor(private router: Router) { }

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
