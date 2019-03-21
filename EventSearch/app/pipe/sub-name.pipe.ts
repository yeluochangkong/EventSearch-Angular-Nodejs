import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subName'
})
export class SubNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.length > 35) {
      let i = 35;
      while (value.charAt(i) != " ") {
        i--;
      }
      value = value.substring(0, i)+"...";
    }
    return value;
  }
}
