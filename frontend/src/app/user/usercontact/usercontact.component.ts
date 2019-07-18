import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.component.html',
  styleUrls: ['./usercontact.component.css',
              '../style.css']
})
export class UsercontactComponent implements OnInit {

  sidebar: boolean;
  contactGroup: FormGroup;
  constructor(private router: Router, private form: FormBuilder) { 

    this.contactGroup = this.form.group({
      email: ['', [Validators.required,
                    Validators.email]
              ],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      message: ['', Validators.required],
      phNum: ['', [Validators.required, 
                  Validators.maxLength(11),
                  Validators.minLength(11)]
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

  ngOnInit() {
  }

}
