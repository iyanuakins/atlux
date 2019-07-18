import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userfooter',
  templateUrl: './userfooter.component.html',
  styleUrls: ['./userfooter.component.css']
})
export class UserfooterComponent implements OnInit {
  year: any;
  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
