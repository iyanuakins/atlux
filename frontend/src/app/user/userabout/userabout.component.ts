import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userabout',
  templateUrl: './userabout.component.html',
  styleUrls: ['./userabout.component.css',
              '../style.css']
})
export class UseraboutComponent implements OnInit {

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
