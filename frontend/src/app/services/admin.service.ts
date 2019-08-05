import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: String = "http://localhost:4000";
  constructor(private http: HttpClient,
              private router: Router) { }

  addCar(data): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/addcar`, data);
  }

  removeCar(carId): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/removecar/${carId}`);
  }

  addCarBrand(data): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/addcarbrand`, data);
  }

  removeCarBrand(data): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/removecarbrand`, data);
  }


  addCarType(data): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/addcartype`, data);
  }

  removeCarType(data): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/removecartype`, data);
  }

  getAllCars(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getallcars`);
  }

  getThisCars(carId): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getallcars/${carId}`);
  }

  getCarCount(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getcarcount`);
  }

  addDriver(driverData): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/adddriver`, driverData);
  }

  suspendDriver(driverId): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/suspenddriver`, driverId);
  }

  getAllDriver(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getalldrivers`);
  }

  getDriverCount(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getdrivercount`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getallorders`);
  }

  completeOrder(orderId): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/completeorder`, orderId);
  }

  approveOrder(orderId): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/approveorder`, orderId);
  }

  getLastOrders(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getlastorders`);
  }

  getPendingOrders(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getpendingorders`);
  }

  getThisUser(userId): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getthisuser/userId`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getallusers`);
  }

  getLastUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getlastusers`);
  }

  getUserCount(): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/getusercount`);
  }

}
