import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',
              '../style.css']
})
export class ProfileComponent implements OnInit {
  updateGroup: FormGroup;
  passwordGroup: FormGroup;
  changePassword: boolean;
  updateProfile: boolean;
  profilePage: boolean = true;
  sidebar: boolean;
  loggedUser: String;
  userData: any;
  updateMessage: String;
  status: Boolean;
  noMatch: Boolean = false;
  userRank: Number;
  userType: String;

  constructor(private form: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService) { 
    this.updateGroup = this.form.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      phNum: ['', [Validators.required,
                  Validators.pattern('^[0-9]{11}')]
      ]
    });
    
  
    this.passwordGroup = this.form.group({
      oldPassword: ['', [Validators.required, 
                      Validators.maxLength(32),
                      Validators.minLength(6)]
                ],
      newPassword: ['', [Validators.required, 
                      Validators.maxLength(32),
                      Validators.minLength(6)]
                ],
      repPassword: ['', [Validators.required, 
                      Validators.maxLength(32),
                      Validators.minLength(6)]
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

  updatePassword() {
    let oldPassword = this.passwordGroup.value.oldPassword;
    let password = this.passwordGroup.value.newPassword;
    let repPassword = this.passwordGroup.value.repPassword;
    if(password == repPassword){
      this.userService.updatePassword(password, oldPassword)
        .subscribe((res) => {
          if(!res.success){
            this.toastr.error('Password update failed', 'Failed', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing',
              easing: 'ease-in'
            });
          } else {
            this.toastr.success('Password update successful', 'success', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing',
              easing: 'ease-in'
            });
            this.passwordGroup.reset();
          }
        }
        )
    } else {
      this.toastr.error('Password update failed', 'Failed', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        easing: 'ease-in'
      });
    }
  }

  checkPassword() {
    let password = this.passwordGroup.value.newPassword;
    let repPassword = this.passwordGroup.value.repPassword;
    if(password != repPassword){
      this.noMatch = true;
    } else {
      this.noMatch = false;
    }
  }

  updatePro() {
    let lastName = this.updateGroup.value.lastName;
    let firstName = this.updateGroup.value.firstName;
    let address = this.updateGroup.value.address;
    let phNum = this.updateGroup.value.phNum;

    this.userService.updateProfile(firstName, lastName, phNum, address)
      .subscribe((res) => {
        if(!res.success){
          this.toastr.error('Password update failed', 'Failed', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            easing: 'ease-in'
          });
        } else {
          this.toastr.success('Profile update successful', 'Success', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            easing: 'ease-in'
          });
          this.updateGroup.reset();
          this.userData = res.userData;
        }
      })
  }

  ngOnInit() {
    this.userRank = this.userService.userRank;
    this.userType = this.userService.userType;
    this.loggedUser = this.userService.loggedUser;
    this.userService.getUserDetails()
      .subscribe( res => {
        this.userData = res[0];
      });
  }

}
