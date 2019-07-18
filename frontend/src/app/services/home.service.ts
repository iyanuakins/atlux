import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService { 
  
  url: String = "http://localhost:4000";

  constructor(private http: HttpClient,
              private router: Router) { }

  getCarBrands (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car/getcarbrands`);
  }

  getCarTypes (): Observable<any> {
    return this.http.get<any>(`${this.url}/home/car/getcartypes`);
  }
}
