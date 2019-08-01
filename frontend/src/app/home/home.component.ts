import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quickOrderGroup : FormGroup;
  catSelected: string = "";
  carBrands: Object;
  carTypes: Object;
  constructor(private form: FormBuilder,
              private homeService: HomeService,
              private router: Router) { 
      this.quickOrderGroup = this.form.group({
        pickUpDate: ['', Validators.required],
        pickUpTime: ['00:00', Validators.required],
        dropOffTime: ['00:00', Validators.required],
        category: ['all', Validators.required],
        type: ['suv', Validators.required],
        maker: ['lexus', Validators.required]
      })
   }

   category () {
     if (this.quickOrderGroup.value.category == 'type') {
      return this.catSelected = "type";
     } else if (this.quickOrderGroup.value.category == 'maker') {
      return this.catSelected = "maker";
    } else {
      return this.catSelected = "";
    }
   } 
   
   onSubmit() {
    // let orderData = {pickUpTime: this.orderGroup.value.pickUpTime,
    //                   pickUpDate: this.orderGroup.value.pickUpDate,
    //                   dropOffTime: this.orderGroup.value.dropOffTime,
    //                   dropOffDate: this.orderGroup.value.dropOffDate}
    // localStorage.setItem('orderData', JSON.stringify(orderData))

    let category = this.quickOrderGroup.value.category
    let type = this.quickOrderGroup.value.type
    let brand = this.quickOrderGroup.value.maker
    if (category == "type") {
      this.homeService.getCarsByType(type).subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order']);
      })
    } else if (category == "maker") {
      this.homeService.getCarsByBrand(brand).subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order']);
      })
    } else if (category == "all") {
      this.homeService.getCars().subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order']);
      })
    }
   }

  ngOnInit() {
    this.homeService.getCarBrands().subscribe((res) => {
      this.carBrands = res;
    })

    this.homeService.getCarTypes().subscribe((res) => {
      this.carTypes = res;
    })
  }

}
