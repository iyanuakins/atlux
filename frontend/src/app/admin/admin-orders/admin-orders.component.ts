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
  message: String;
  processOrderGroup: FormGroup;
  constructor(private adminService: AdminService,
              private form: FormBuilder) { 
    this.processOrderGroup = this.form.group({
      driver: ['', Validators.required],
      orderID: ['']
    })
  }


  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }


  startProcess(orderID) {
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

  processOrder(order) {
    const driverID = this.processOrderGroup.value.driver;
    const data = {
      driverID,
      order
    }
    this.adminService.approveOrder(data)
      .subscribe((res) => {
        if (res.success) {
          if (res.success) {
            this.adminService.getAllOrders()
              .subscribe((res) => {
                if (res.success) {
                  if (res.available) {
                    this.orders = res.orders;
                  }
                }
              })
            this.message = 'Order Processed';
            setTimeout(() => {
              this.message = '';
            }, 2000);
          } else {
            this.message = 'Unable to process order';
            setTimeout(() => {
              this.message = '';
            }, 2000);
          }
        }
      })
  }

  completeOrder(orderID) { 
    this.adminService.completeOrder({orderID})
      .subscribe((res) => {
        if (res.success) {
          if (res.success) {
            this.adminService.getAllOrders()
              .subscribe((res) => {
                if (res.success) {
                  if (res.available) {
                    this.orders = res.orders;
                  }
                }
              })
            this.message = 'Order Completed';
            setTimeout(() => {
              this.message = '';
            }, 2000);
          } else {
            this.message = 'Unable to complete order';
            setTimeout(() => {
              this.message = '';
            }, 2000);
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
