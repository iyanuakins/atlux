import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-drivers',
  templateUrl: './admin-drivers.component.html',
  styleUrls: ['./admin-drivers.component.css',
              './../style.css']
})
export class AdminDriversComponent implements OnInit {

  sidebar: Boolean;
  loader: Boolean;
  usernameTaken: boolean = false;
  emailTaken: boolean = false;
  drivers: Object;
  driverGroup : FormGroup;
  message: String;
  constructor(private adminService: AdminService,
              private form: FormBuilder,
              private auth: AuthService) { 
    this.driverGroup = this.form.group({
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
  }


  sidebarActive () {
    if (this.sidebar === true ) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }

  addDriver() {
    let firstName = this.driverGroup.value.firstName;
    let lastName = this.driverGroup.value.lastName;
    let phNum = this.driverGroup.value.phNum;
    let email = this.driverGroup.value.email;
    let password = this.driverGroup.value.password;
    let address = this.driverGroup.value.address;
    let username = this.driverGroup.value.username;

    let data = {
      firstName,
      lastName,
      phNum,
      email,
      password,
      address,
      username
    }

    this.adminService.addDriver(data)
      .subscribe(
        (res) => {
          if (res.success) {
            this.message = 'Driver successful added';
            setTimeout(() => {
              this.message = '';
            }, 2000);
          } else {
            this.message = 'Unable to add driver';
            setTimeout(() => {
              this.message = '';
            }, 2000);
          }
        }
      );
  }


  checkEmail () {
    let email = this.driverGroup.value.email;
    
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
    let username = this.driverGroup.value.username;
    
    this.auth.checkUsername(username).subscribe(
      (res) => {
        if(res.status){
          return this.usernameTaken = true;
        } else {
          return this.usernameTaken = false;
        }
        
    });
  }

  ngOnInit() {
  }

}