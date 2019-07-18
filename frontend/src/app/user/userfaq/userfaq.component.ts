import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userfaq',
  templateUrl: './userfaq.component.html',
  styleUrls: ['./userfaq.component.css',
              '../style.css']
})
export class UserfaqComponent implements OnInit {

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
