import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)] );
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');
  ageField = new FormControl(12);
  rangeField = new FormControl();
  monthField = new FormControl('');
  weekField = new FormControl('');
  categoryField = new FormControl('category-3');
  tagField = new FormControl(['tag-3']);

  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');
  

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
  
  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges
      .subscribe(value => {
        console.log(value);
      });
    this.colorField.valueChanges
      .subscribe(value => {
        console.log(value);
      });
    this.tagField.valueChanges
      .subscribe(value => {
        console.log(value);
    });
    this.rangeField.valueChanges
      .subscribe(value => {
        console.log(value)
    });
    this.monthField.valueChanges
        .subscribe(value => {
          console.log(value);
    });
    this.weekField.valueChanges
      .subscribe(value => {
        console.log(value);
    });
    this.genderField.valueChanges
      .subscribe(value => {
        console.log(value);
      })
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
}
