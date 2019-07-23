import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: string = '';
  url: String = "http://localhost:4000";
  cars: Object;
  newCartCount: Number;
  cartItems: Number;
  cartData: any;
  constructor(private http: HttpClient,
              private router: Router) { 

    if (this.loggedUser =='' && !!localStorage.getItem('user')){
        this.loggedUser = localStorage.getItem('user')
        //localStorage.removeItem('user')
    } else {
      router.navigate(['/auth'])
    }
    
  }
   
  updateProfile (firstName, lastName, phNum, address): Observable<any> {

    const user = {
        username: this.loggedUser,
        firstName,
        lastName,
        address,
        phNum
      } 

    return this.http.post<any>(`${this.url}/user/profile/edit`, user);
      
  }
  updatePassword (password, oldPassword): Observable<any> {

    const user = {
        username: this.loggedUser,
        password,
        oldPassword
      } 

    return this.http.post<any>(`${this.url}/user/profile/password`, user);
      
  }

  getUserDetails (username): Observable<any> {
       return this.http.get<any>(`${this.url}/user/profile/view/${username}`);
  }

  getCars (): Observable<any> {
       return this.http.get<any>(`${this.url}/user/car`);
  }
  getCarsByBrand (brand): Observable<any> {
       return this.http.get<any>(`${this.url}/user/carbrand/${brand}`);
  }
  getCarsByType (type): Observable<any> {
       return this.http.get<any>(`${this.url}/user/cartype/${type}`);
  }

  viewCar (carId): Observable<any> {
    return this.http.get<any>(`${this.url}/user/viewcar/${carId}`);
  }

  addToCart (data): Observable<any> {
    return this.http.post<any>(`${this.url}/user/cart/add`, data);
  }

  countCart (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/cart/count/${this.loggedUser}`);
  }

  getUserCart (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/cart/getusercart/${this.loggedUser}`);
  }

  removeItem (cartId): Observable<any> {
    return this.http.get<any>(`${this.url}/user/cart/removeitem/${cartId}`);
  }

  userGetCarBrands (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/car/getcarbrands`);
  }

  userGetCarTypes (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/car/getcartypes}`);
  }

  getDistance (latitude, longitude, deslatitude, deslongitude): Observable<any> {
    let apiKey = 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk';
    return this.http.get(`http://maps.googleapis.com/maps/api/distancematrix/json?&origins=${latitude},-${longitude}&destination=${deslatitude},-${deslongitude}&mode=driving&key=${apiKey}`);
  }

}
