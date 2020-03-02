import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: string = '';
  url: String = environment.url || "http://localhost:4000";
  cars: Object;
  newCartCount: Number;
  cartTryData = new BehaviorSubject<string>('0');
  CartItems = this.cartTryData.asObservable();
  cartData: any;
  orderIsCompleted: Boolean;
  userRank: Number;
  userType: String;

  constructor(private http: HttpClient,
              private router: Router) { 
    if ((this.loggedUser =='' && !!localStorage.getItem('user')) || (!this.userRank && !this.userType)){
      this.loggedUser = localStorage.getItem('user');
      this.userRank = parseInt(localStorage.getItem('userRank'));
      this.userType = localStorage.getItem('userType');
    } else if (!localStorage.getItem('user')){
      this.router.navigate(['/auth'])
    }
  }
   
  validateUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/user/validateusers`);
}

  updateUser() {
    this.loggedUser = localStorage.getItem('user');
    this.userRank = parseInt(localStorage.getItem('userRank'));
    this.userType = localStorage.getItem('userType');
    if (this.userType === 'client') {
      this.router.navigate(['/user']);
    } else if (this.userType === 'admin') {
      this.router.navigate(['/admin']);
    }
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

  getUserDetails (): Observable<any> {
       return this.http.get<any>(`${this.url}/user/profile/view/${this.loggedUser}`);
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

  getCarBrands (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car/getcarbrands`);
  }

  getCarTypes (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car/getcartypes`);
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
    return this.http.get<any>(`${this.url}/user/car/getcartypes`);
  }

  getOrders (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/order/getorders/${this.loggedUser}`);
  }

  getLastOrders (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/order/getlastorders/${this.loggedUser}`);
  }

  getUserRank (): Observable<any> {
    return this.http.get<any>(`${this.url}/user/getrank/${this.loggedUser}`);
  }


  checkout (data): Observable<any> {
    return this.http.post<any>(`${this.url}/user/cart/checkout`, data);
  }

  makePayment (data): Observable<any> {
    return this.http.post<any>(`${this.url}/user/cart/payment`, data);
  }

  transferCartItems (cartItems): Observable<any> {
    let data = [
      this.loggedUser,
      cartItems
    ]
    return this.http.post<any>(`${this.url}/user/cart/transfer`, data);
  }

  // getDistance (latitude, longitude, deslatitude, deslongitude): Observable<any> {
  //   let apiKey = 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk';
  //   return this.http.get(`http://maps.googleapis.com/maps/api/distancematrix/json?&origins=${latitude},-${longitude}&destination=${deslatitude},-${deslongitude}&mode=driving&key=${apiKey}`);
  // }

}
