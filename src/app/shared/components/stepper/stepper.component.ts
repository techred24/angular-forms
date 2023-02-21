import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor {
  currentValue = 0;
  constructor() { }

  ngOnInit(): void {
  }
  add() {
    this.currentValue += 1;
  }
  sub() {
    this.currentValue -= 1;
  }

  writeValue(value: number): void {
      if (value) {
        this.currentValue = value;
      }
  }
  registerOnChange(fn: any): void {
      
  }
  registerOnTouched(fn: any): void {
      
  }
  setDisabledState(isDisabled: boolean): void {
      
  }

}
