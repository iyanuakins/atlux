import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private form: FormBuilder,
              private userService: UserService) { 
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

  passwordActive () {
    this.changePassword = true;
    this.updateProfile = false;
    this.profilePage = false;
  }

  updateActive () {
    this.changePassword = false;
    this.updateProfile = true;
    this.profilePage = false;
  }

  profileActive () {
    this.changePassword = false;
    this.updateProfile = false;
    this.profilePage = true;
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
            this.updateMessage = 'Password update failed'
            this.status = false
            setTimeout(() => {
              this.updateMessage = ''
            },5000)
          } else {
            this.updateMessage = 'Password update successful'
            this.status = true
            this.passwordGroup.reset();
            setTimeout(() => {
              this.updateMessage = ''
            },5000)
          }
        }
        )
    } else {
      this.updateMessage = 'Password update failed'
      this.status = false
      setTimeout(() => {
        this.updateMessage = ''
      },5000)
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
          this.updateMessage = 'Profile update failed'
          this.status = false
          setTimeout(() => {
            this.updateMessage = ''
          },5000)
        } else {
          this.updateMessage = 'Profile update successful'
          this.status = true
          this.updateGroup.reset();
          this.userData = res.userData;
          setTimeout(() => {
            this.updateMessage = ''
          },5000)
        }
      })
  }

  ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
    this.userService.getUserDetails(this.loggedUser)
      .subscribe( res => {
        this.userData = res[0];
      });
  }

}
