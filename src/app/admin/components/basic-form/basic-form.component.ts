import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('Soy un control');
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');
  ageField = new FormControl(12);
  
  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges
      .subscribe(value => {
        console.log(value);
      });
    this.colorField.valueChanges
      .subscribe(value => {
        console.log(value);
      })
  }
  getNameValue () {
    // console.log(this.nameField.value);
  }
}
