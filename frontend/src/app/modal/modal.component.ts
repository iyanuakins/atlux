import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-homemodal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class HomeModalComponent implements OnInit {
  orderGroup : FormGroup;
  catSelected: string = "";
  carBrands: Object;
  carTypes: Object;

  constructor(private form: FormBuilder,
              private homeService: HomeService,
              private router: Router) {
      this.orderGroup = this.form.group({
        pickUpDate: ['', Validators.required],
        pickUpTime: ['00:00', Validators.required],
        //dropOffTime: ['00:00', Validators.required],
        category: ['all', Validators.required],
        type: ['suv', Validators.required],
        maker: ['lexus', Validators.required]
      })
   }

   category () {
     if (this.orderGroup.value.category == 'type') {
      return this.catSelected = "type";
     } else if (this.orderGroup.value.category == 'maker') {
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

    let category = this.orderGroup.value.category
    let type = this.orderGroup.value.type
    let brand = this.orderGroup.value.maker
    if (category == "type") {
      this.homeService.getCarsByType(type).subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order'])
      })
    } else if (category == "maker") {
      this.homeService.getCarsByBrand(brand).subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order'])
      })
    } else if (category == "all") {
      this.homeService.getCars().subscribe((res) => {
        this.homeService.cars = res;
        this.router.navigate(['/order'])
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
