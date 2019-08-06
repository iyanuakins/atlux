import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css',
              './../style.css']
})
export class AdminOrdersComponent implements OnInit {
  sidebar: Boolean;
  orders: Object;
  loader: Boolean;
  orderID: String;
  drivers: Object;
  processOrderGroup: FormGroup;
  constructor(private adminService: AdminService,
              private form: FormBuilder) { 
    this.processOrderGroup = this.form.group({
      driver: ['', Validators.required],
      orderID: ['', Validators.required]
    })
  }


  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }


  processOrder(orderID) {
    this.adminService.getAllDriver()
      .subscribe((res) => {
        if (res.success) {
          if (res.available) {
            this.drivers = res.drivers;
            this.orderID = orderID;
            document.getElementById('viewBtn').click();
          }
        }
      })
  }

  ngOnInit() {
    this.loader = true;
    this.adminService.getAllOrders()
      .subscribe((res) => {
        if (res.success) {
          if (res.available) {
            this.orders = res.orders;
          } else {
            this.orders = 0;
          }
          this.loader = false;
        } else {
          this.orders = 0;
          this.loader = false;
          }
        })
  }

}
