import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: String = environment.url || "http://localhost:4000";

  userid: String;

  isLoggedOut: Boolean;

  isOrderLogin: Boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private userService:UserService) { }

  newUser (firstName, lastName, phNum, password, email, username, address) {

    const user = {
      username,
      email,
      password,
      details: {
        firstName,
        lastName,
        address,
        phNum
      } 
    }

    return this.http.post<any>(`${this.url}/auth/register`, user);
      
  }

    userLogin (username, password) {
      const userLog = {
        username,
        password
      }

      return this.http.post<any>(`${this.url}/auth/login`, userLog);
  }

  loggedIn(){
     return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  checkEmail (email) {
   const user = {
      email
    }
    return this.http.post<any>(`${this.url}/auth/email`, user);
  }

  checkUsername (username) {
   const user = {
      username
    }
    return this.http.post<any>(`${this.url}/auth/username`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userService.loggedUser = '';
    this.userService.userRank = null;
    this.isLoggedOut = true;
    this.userService.userType = null;
    this.router.navigate(['/auth']);
  }

  orderLogin() {
    this.isOrderLogin = true;
    this.router.navigate(['/auth']);
  }
  
}