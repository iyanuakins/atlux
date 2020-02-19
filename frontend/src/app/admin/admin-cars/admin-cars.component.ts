import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  message: String;
  carMessage: String;
  avail: Boolean;
  typeGroup: FormGroup;
  brandGroup: FormGroup;
  constructor(private adminService: AdminService, 
              private form: FormBuilder) { 
    this.typeGroup = this.form.group({
      typeName: ['', Validators.required]
    })

    this.brandGroup = this.form.group({
      brandName: ['', Validators.required]
    })
}

  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  addBrandToDB() {
    this.adminService.addBrandToDB()
      .subscribe((res) => {
        if (res.success) {
          this.message = 'Brand Added to Database'
          setTimeout(() => {
            this.message = '';
          }, 2000);
        }
      })
  }

  addTypeToDB() {
    this.adminService.addTypeToDB()
      .subscribe((res) => {
        if (res.success) {
          this.message = 'Brand Added to Database'
          setTimeout(() => {
            this.message = '';
          }, 2000);
        }
      })
  }

  addCarBrand() {
    let data = {
          brand: {
            name: this.brandGroup.value.brandName
        }
    }
    this.adminService.addCarBrand(data)
      .subscribe((res) => {
        if (res.success) { 
          this.brandGroup.reset();
          this.carMessage = 'Car brand successfully added';
          setTimeout(() => {
            this.carMessage = '';
          }, 2000);
        } else {
          this.carMessage = 'Unable to add car brand';
          setTimeout(() => {
            this.carMessage = '';
          }, 2000);
        }
      })
  }

  addCarType() {
    let data = {
        cartype: {
          name: this.typeGroup.value.typeName
        }
    }
    this.adminService.addCarType(data)
      .subscribe((res) => {
        if (res.success) {
          this.typeGroup.reset();
          this.carMessage = 'Car type successfully added';
          setTimeout(() => {
            this.carMessage = '';
          }, 2000);
        } else {
          this.carMessage = 'Unable to add car type';
          setTimeout(() => {
            this.carMessage = '';
          }, 2000);
        }
      })
  }

  ngOnInit() {
    this.adminService.checkDB()
      .subscribe((res) => {
        if (res.avail) {
          this.avail = true
        } else {
          this.avail = false
        }
      })
  }

}