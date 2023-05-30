import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  template: ''
})
export class CustomFormControl implements ControlValueAccessor {
  protected _config: any;
  protected _val: any; // value of the component
  protected _control: any;
  @Input()
  set config(con) {
    this._config = JSON.parse(JSON.stringify(con));
  }
  get config(): any {
    return this._config;
  }

  @Input()
  set control(con) {
    this._control = con;
  }
  get control(): FormControl {
    return this._control;
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val) {
    this._val = val;
    this.onChange(val);
    this.onTouch(val);
  }
  get value(): any {
    return this._val;
  }
  writeValue(value: any): void {
    this.value = value;
  }
  // method to be triggered on UI change
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // method to be triggered on component touch
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
