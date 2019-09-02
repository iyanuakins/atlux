import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-admin-cars",
  templateUrl: "./admin-cars.component.html",
  styleUrls: ["./admin-cars.component.css", "./../style.css"]
})
export class AdminCarsComponent implements OnInit {
  sidebar: Boolean;
  isBrand: Boolean = true;
  isRemoveBrand: Boolean = true;
  loader: Boolean;
  drivers: Object;
  message: String;
  carMessage: String;
  avail: Boolean;
  cars: Object;
  carData: any;
  types: Object;
  brands: Object;
  typeGroup: FormGroup;
  brandGroup: FormGroup;
  removeTypeGroup: FormGroup;
  removeBrandGroup: FormGroup;
  addCarGroup: FormGroup;
  removeCarGroup: FormGroup;
  constructor(private adminService: AdminService,
              private userService: UserService,
              private form: FormBuilder,
              private toastr: ToastrService) {
    this.typeGroup = this.form.group({
      typeName: ["", Validators.required]
    });

    this.brandGroup = this.form.group({
      brandName: ["", Validators.required]
    });

    this.removeTypeGroup = this.form.group({
      typeName: ["", Validators.required]
    });

    this.removeBrandGroup = this.form.group({
      brandName: ["", Validators.required]
    });

    this.addCarGroup = this.form.group({
      brand: ["lexus", Validators.required],
      type: ["suv", Validators.required],
      model: ["", Validators.required],
      colour: ["", Validators.required],
      pricePerKM: ["", Validators.required],
      description: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit.", [Validators.required]]
    });
    
    this.removeCarGroup = this.form.group({
      car: ["", Validators.required]
    });
  }

  sidebarActive() {
    if (this.sidebar === true) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  toggleAdd() {
    if (this.isBrand === true) {
      this.isBrand = false;
    } else {
      this.isBrand = true;
    }
  }

  toggleRemove() {
    if (this.isRemoveBrand === true) {
      this.isRemoveBrand = false;
    } else {
      this.isRemoveBrand = true;
    }
  }

  addBrandToDB() {
    this.adminService.addBrandToDB()
    .subscribe(res => {
      if (res.success) {
        this.toastr.success('Brand Added to Database', 'Added', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    });
  }

  addTypeToDB() {
    this.adminService.addTypeToDB()
    .subscribe(res => {
      if (res.success) {
        this.toastr.success('Type Added to Database', 'Logged Out', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    });
  }

  addCarBrand() {
    let data = {
      brand: {
        name: this.brandGroup.value.brandName
      }
    };
    this.adminService.addCarBrand(data)
    .subscribe(res => {
      if (res.success) {
        this.brandGroup.reset();
        this.toastr.success('Car brand successfully added', 'success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      } else {
        this.toastr.error('Unable to add car brand', 'Failed', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    });
  }

  addCarType() {
    let data = {
      cartype: {
        name: this.typeGroup.value.typeName
      }
    };
    this.adminService.addCarType(data)
    .subscribe(res => {
      if (res.success) {
        this.typeGroup.reset();
        this.toastr.success('Car type successfully added', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      } else {
        this.toastr.error('Unable to add car type', 'Failed', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    });
  }

  removeCarBrand() {
    let data = {
      brand: {
        name: this.removeBrandGroup.value.brandName
      }
    };
    this.adminService.removeCarBrand(data)
    .subscribe(res => {
      if (res.success) {
        this.removeBrandGroup.reset();
        this.toastr.success('Car brand successfully added', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      } else {
        this.toastr.error('Unable to add car brand', 'Failed', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    });
  }

  removeCarType() {
    let data = {
      cartype: {
        name: this.removeTypeGroup.value.typeName
      }
    };
    this.adminService.removeCarType(data)
    .subscribe(res => {
      if (res.success) {
        this.removeTypeGroup.reset();
        this.toastr.success('Car type successfully removed', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      } else { 
        this.toastr.error('Unable to remove car type', 'Failed', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      }
    });
  }

  showCarModal() {
    this.adminService.getAllCars()
    .subscribe(res => {
      if (res.success) {
        if (res.available) {
          this.cars = res.cars;
          document.getElementById("viewBtn").click();
        } else {
          this.cars = [];
          document.getElementById("viewBtn").click();
        }
      }
    });
  }

  addCar() {
    let image = 'assets/img/sedan.png';
    let brand = this.addCarGroup.value.brand;
    let type = this.addCarGroup.value.type;

    if (brand == 'mercedes' && type == 'sedan') {
      image = 'assets/img/mer-sedan.jpeg'
    }
    if (brand == 'tesla' && type == 'sedan') {
      image = 'assets/img/tesla.jpeg'
    }
    if (brand == 'rolls royce' && type == 'sedan') {
      image = 'assets/img/rolls-royce.jpg'
    }
    if (brand == 'mercedes' && type == 'van') {
      image = 'assets/img/van.jpeg';
    }
    if (brand == 'ford' && type == 'suv') {
      image = 'assets/img/suv.jpeg';
    }
    if (brand == 'range rover' && type == 'convertible') {
      image = 'assets/img/convertible.jpeg';
    }
    if (brand == 'range rover' && type == 'suv') {
      image = 'assets/img/rover.jpeg';
    }
    if (brand == 'lamborghini' && type == 'fast car') {
      image = 'assets/img/lambo.jpeg';
    }
    if (brand == 'tesla' && type == 'fast car') {
      image = 'assets/img/roadstar.jpeg';
    }
    if (brand == 'lambo' && type == 'fast car') {
      image = 'assets/img/lambo.jpeg';
    }
    
    let data = { 
      brand,
      type,
      model: this.addCarGroup.value.model,
      description: this.addCarGroup.value.description,
      colour: this.addCarGroup.value.colour,
      pricePerKM: this.addCarGroup.value.pricePerKM,
      image
    }
    this.adminService.addCar(data)
      .subscribe((res) => {
        if (res.success) {
            this.userService.getCars()
            .subscribe((res) => {
              if (res.length) {
                this.carData = res;
                this.loader = false;
              } else {
                this.carData = null;
                this.loader = false;
              }
            })
            this.addCarGroup.reset();
            this.toastr.success('Car successfully added', 'Success', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            easing: 'ease-in'
          });
        } else {
          this.toastr.error('Unable to add car', 'Failed', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            easing: 'ease-in'
          });
        }
      })
  }

  removeCar() {
    let car = this.removeCarGroup.value.car;
    this.adminService.removeCar(car)
    .subscribe((res) => {
      if (res.success) {
        this.removeCarGroup.reset();
        let removedIndex;
        this.carData.map((item, index) => {
          if (car == item._id) {
            removedIndex = index;
          }
        });
        this.carData.splice(removedIndex, 1);
        if (this.carData.length < 1) {
          this.carData = null;
        }
        this.toastr.success('Car successfully removed', 'Success', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        easing: 'ease-in'
        });
      } else {
        this.toastr.error('Unable to remove car', 'Failed', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        easing: 'ease-in'
        });
      }
    })
  }

  ngOnInit() {
    this.loader = true;
    this.adminService.checkDB()
    .subscribe(res => {
      if (res.avail) {
        this.avail = true;
      } else {
        this.avail = false;
      }
    });

    this.userService.getCarBrands()
    .subscribe((res) => {
      this.brands = res;
    })

    this.userService.getCarTypes()
    .subscribe((res) => {
      this.types = res;
    })
    
    this.userService.getCars()
    .subscribe((res) => {
      if (res.length) {
        this.carData = res;
        this.loader = false;
      } else {
        this.carData = null;
        this.loader = false;
      }
    })
  }
}
