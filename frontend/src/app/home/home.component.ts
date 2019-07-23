import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';

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
              private homeService: HomeService) { 
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
   

  ngOnInit() {
    this.homeService.getCarBrands().subscribe((res) => {
      
      this.carBrands = res;
    })

    this.homeService.getCarTypes().subscribe((res) => {
      this.carTypes = res;
    })
  }

}
