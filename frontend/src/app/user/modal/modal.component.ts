import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  orderGroup : FormGroup;
  catSelected: string = "";

  constructor(private form: FormBuilder,
              private userService: UserService,
              private router: Router) {
      this.orderGroup = this.form.group({
        pickUpDate: ['', Validators.required],
        dropOffDate: ['', Validators.required],
        pickUpTime: ['00:00', Validators.required],
        dropOffTime: ['00:00', Validators.required],
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
    let orderData = {pickUpTime: this.orderGroup.value.pickUpTime,
                      pickUpDate: this.orderGroup.value.pickUpDate,
                      dropOffTime: this.orderGroup.value.dropOffTime,
                      dropOffDate: this.orderGroup.value.dropOffDate}
    localStorage.setItem('orderData', JSON.stringify(orderData))

    let category = this.orderGroup.value.category
    let type = this.orderGroup.value.type
    let brand = this.orderGroup.value.maker
    if (category == "type") {
      this.userService.getCarsByType(type).subscribe((res) => {
        this.userService.cars = res;
        this.router.navigate(['user/order'])
      })
    } else if (category == "maker") {
      this.userService.getCarsByBrand(brand).subscribe((res) => {
        this.userService.cars = res;
        this.router.navigate(['user/order'])
      })
    } else if (category == "all") {
      this.userService.getCars().subscribe((res) => {
        this.userService.cars = res;
        this.router.navigate(['user/order'])
      })
    }
   }
  ngOnInit() {
  }

}
