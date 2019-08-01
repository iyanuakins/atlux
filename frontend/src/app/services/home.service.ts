import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService { 
  
  url: String = "http://localhost:4000";
  cars: any;
  cartTryData = new BehaviorSubject<string>('0');
  cartLength =this.cartTryData.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
              }

  updateCartCount(count, update) {
    if (update == "increase") {
      let newValue = parseInt(this.cartTryData.value) + 1;
      this.cartTryData.next(`${newValue}`);
    } else if (update == "decrease") {
      let newValue = parseInt(this.cartTryData.value) - 1;
      this.cartTryData.next(`${newValue}`);
    } else {
      this.cartTryData.next(count);
    }
  }

  getCarBrands (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car/getcarbrands`);
  }

  getCarTypes (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car/getcartypes`);
  }

  getCars (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car`);
  }
  getCarsByBrand (brand): Observable<any> {
      return this.http.get<any>(`${this.url}/home/carbrand/${brand}`);
  }
  getCarsByType (type): Observable<any> {
      return this.http.get<any>(`${this.url}/home/cartype/${type}`);
  }

  viewCar (carId): Observable<any> {
  return this.http.get<any>(`${this.url}/home/viewcar/${carId}`);
  }
}
