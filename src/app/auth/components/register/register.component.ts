import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    // this.form.get('confirmPassword').valueChanges.subscribe(value => {
    //   console.log(value)
    // });
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', Validators.required]
    }, {
      validators: MyValidators.matchPassword
    });
    this.typeField.valueChanges
      .subscribe(value => {
        console.log(value);
        if (value === 'company') {
          this.companyNameField.setValidators([Validators.required]);
        } else {
          this.companyNameField.setValidators(null);
        }
        this.companyNameField.updateValueAndValidity();
      })
  }
  get typeField() {
    return this.form.get('type')
  }
  get companyNameField() {
    return this.form.get('companyName')
  }

  // isPasswordFieldInvalid(): Boolean {
  //   return this.form.get('password').touched && this.form.get('password').invalid;
  // }

}
