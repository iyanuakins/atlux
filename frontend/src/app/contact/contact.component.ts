import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactGroup: FormGroup;
  constructor(private form: FormBuilder) {
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

  ngOnInit() {
  }

}
