import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[appForBidden]'
})
export class ForBiddenDirective {

  constructor() { }

}
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
     let forbidden = false;
     if (control.value != null)
     {
       let m = control.value.trim().match(nameRe);
       if (m == null) forbidden = true;
     }
    return forbidden?  {'forbiddenName': {value: 'Please do not enter sepcial characters, such as '}}: null;
  };
}
export function spaceValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
     let onlySpace = false;
     let reg = null;
     if (control.value != null) {
      reg = control.value.trim();
     }
     if (reg == "") onlySpace = true;
    return onlySpace? {'forbiddenName': {value: 'Please enter a keyword. '}} : null;
  };
}

