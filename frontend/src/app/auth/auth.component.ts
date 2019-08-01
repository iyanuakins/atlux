import { Component, OnInit } from '@angular/core';
import { filter} from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Event as NavigationEvent } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
  available: boolean;
  loginGroup : FormGroup;
  regGroup : FormGroup;
  usernameTaken: boolean = false;
  emailTaken: boolean = false;
  loginError: String;
  regError: String;
  logMessage: String;
  message: String;

  constructor (private router: Router, private form: FormBuilder, private auth: AuthService) { 
    this.regGroup = this.form.group({
      username: ['', Validators.required],
      email: ['', [Validators.required,
                    Validators.email]
              ],
      password: ['', [Validators.required, 
                      Validators.maxLength(32),
                      Validators.minLength(6)]
                ],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      phNum: ['', [Validators.required,
                  Validators.pattern('^[0-9]{11}')]
      ]
    });

    
    this.loginGroup = this.form.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, 
                      Validators.maxLength(32),
                      Validators.minLength(6)]
                ]
    });
  }

  signUp () {
    this.router.navigate(['/auth'], {fragment: 'register'});
  }

  signIn () {
    this.router.navigate(['/auth'], {fragment: 'login'});
  }

  doRegister () {
    let firstName = this.regGroup.value.firstName;
    let lastName = this.regGroup.value.lastName;
    let phNum = this.regGroup.value.phNum;
    let email = this.regGroup.value.email;
    let password = this.regGroup.value.password;
    let address = this.regGroup.value.address;
    let username = this.regGroup.value.username;
    this.auth.newUser(firstName, lastName, phNum, password, email, username, address).subscribe((res) => {
      if (res.error) {
        this.regError = 'Registration Failed';
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user);
        this.router.navigate(['/user']);
      }
    });
    
  }

  checkEmail () {
    let email = this.regGroup.value.email;
    
    this.auth.checkEmail(email).subscribe(
      (res) => {
        if (res.status) {
          return this.emailTaken = true;
        } else {
          return this.emailTaken = false;
        }
        
    });
  }


  checkUsername () {
    let username = this.regGroup.value.username;
    
    this.auth.checkUsername(username).subscribe(
      (res) => {
        if(res.status){
          return this.usernameTaken = true;
        } else {
          return this.usernameTaken = false;
        }
        
    });
  }


  doLogin () {
    let username = this.loginGroup.value.username;
    let password = this.loginGroup.value.password;

    this.auth.userLogin(username, password).subscribe((res) => {
      if (res.error) {
        this.loginError = 'Username or Password is incorrect';
      } else {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.user);
          this.router.navigate(['/user']);
      }
    })
  }


  ngOnInit() {
    this.router.events
    .pipe(
      filter((event: NavigationEvent) => event instanceof NavigationEnd)
    ).subscribe(res => {
      if (this.router.url == "/auth#login") {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    });

    if(!!localStorage.getItem('token') && !!localStorage.getItem('user')){
      this.router.navigate(['/user']);
    }

    if (this.auth.isLoggedOut) {
      this.logMessage = 'Logout Successful';
      setTimeout(() => {
        this.logMessage = '';
      }, 2000)
    }

    if (this.auth.isOrderLogin) {
      this.message = 'Please login or register to complete your order';
      setTimeout(() => {
        this.message = '';
      }, 10000)
    }
  }
}
