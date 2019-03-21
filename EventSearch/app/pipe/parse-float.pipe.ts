import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseFloat'
})
export class ParseFloatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = parseFloat(value);
    return value;
  }

}
