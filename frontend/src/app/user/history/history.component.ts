import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css',
              '../style.css']
})
export class HistoryComponent implements OnInit {

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
