import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

interface Preference {
  area: string;
  value: string;
}
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup;

  // this.form = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
  //   email: new FormControl(''),
  //   phone: new FormControl(''),
  //   color: new FormControl('#000000'),
  //   date: new FormControl(''),
  //   age: new FormControl(12),
  //   range: new FormControl(),
  //   month: new FormControl(''),
  //   week: new FormControl(''),
  //   category: new FormControl('category-3'),
  //   tag: new FormControl(['tag-3']),
  //   agree: new FormControl(false),
  //   gender: new FormControl(''),
  //   zone: new FormControl('')
  // })

  // nameField = new FormControl('', [Validators.required, Validators.maxLength(10)] );
  // emailField = new FormControl('');
  // phoneField = new FormControl('');
  // colorField = new FormControl('#000000');
  // dateField = new FormControl('');
  // ageField = new FormControl(12);
  // rangeField = new FormControl();
  // monthField = new FormControl('');
  // weekField = new FormControl('');
  // categoryField = new FormControl('category-3');
  // tagField = new FormControl(['tag-3']);

  // agreeField = new FormControl(false);
  // genderField = new FormControl('');
  // zoneField = new FormControl('');


  preferences: string[] = [];
  preferenceList: Array<Preference> = [
    { area: 'Contenido Digital', value: 'contenido-digital' },
    { area: 'Desarrollo e Ingeniería', value: 'desarrollo' },
    { area: 'Diseño y UX', value: 'disenio'},
    { area: 'Marketing', value: 'marketing' },
    { area: 'Negocios y Emprendimiento', value: 'negocios' },
    { area: 'Crecimiento Profesional', value: 'crecimiento-profesional' },
    { area: 'Startup', value: 'startup' }
  ]

  constructor(private formBuilder: FormBuilder) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.form.valueChanges
    .subscribe(value => {
      console.log(value);
    });
    // this.nameField.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
    // this.colorField.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
    // this.tagField.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    // });
    // this.rangeField.valueChanges
    //   .subscribe(value => {
    //     console.log(value)
    // });
    // this.monthField.valueChanges
    //     .subscribe(value => {
    //       console.log(value);
    // });
    // this.weekField.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    // });
    // this.genderField.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   })
  }
  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value)
    } else {
      this.form.markAllAsTouched();
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      fullname: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        last: ['', [Validators.required]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      age: [12, [Validators.required, Validators.min(18), Validators.max(100)]],
      range: [],
      month: [''],
      week: [''],
      category: ['category-3'],
      tag: [['tag-3']],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: ['']
    })
  }
  get nameField() {
    return this.form.get('fullname.name');
    // return this.form.get('fullname').get('name');
  }
  get lastField() {
    return this.form.get('fullname.last');
    // return this.form.get('fullname').get('last');
  }
  get emailField() {
    return this.form.get('email');
  }
  get phoneField() {
    return this.form.get('phone');
  }
  get colorField() {
    return this.form.get('color');
  }
  get dateField() {
    return this.form.get('date');
  }
  get ageField() {
    return this.form.get('age');
  }
  get rangeField() {
    return this.form.get('range');
  }
  get monthField() {
    return this.form.get('month');
  }
  get weekField() {
    return this.form.get('week');
  }
  get categoryField() {
    return this.form.get('category');
  }
  get tagField() {
    return this.form.get('tag');
  }
  get agreeField() {
    return this.form.get('agree');
  }
  get genderField() {
    return this.form.get('gender');
  }
  get zoneField() {
    return this.form.get('zone');
  }
  getNameValue () {
    // console.log(this.nameField.value);
  }
  checkboxChangeHandle(event: Event) {
    const { checked, value } = event.target as HTMLInputElement;
    if (checked) {
      this.preferences.push(value);
    } else {
      const index = this.preferences.indexOf(value);
      this.preferences.splice(index, 1);
    }
  }
  get isNameFieldValid() {
    // return this.form.get('fullname').get('name').touched && this.form.get('fullname').get('name').valid;
    return this.nameField.touched && this.nameField.valid;
  }
  get isLastFieldInvalid() {
    return this.lastField.touched && this.lastField.invalid;
  }
  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }
  get isPhoneFieldInvalid() {
    return this.phoneField.touched && this.phoneField.invalid;
  }
  get isEmailFieldInvalid() {
    return this.emailField.touched && this.emailField.invalid;
  }
  get isAgeFieldInvalid() {
    return this.ageField.touched && this.ageField.invalid;
  }
  get isAgreeFieldInvalid() {
    return this.agreeField.touched && this.agreeField.invalid;
  }
}
