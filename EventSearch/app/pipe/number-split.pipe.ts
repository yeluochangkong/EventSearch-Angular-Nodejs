import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSplit'
})
export class NumberSplitPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    let reminder = 0
    let l = value;
    let  followers = "";
    let str = "";
    while (l > 999) {
      reminder = l % 1000;
      l = Math.trunc(l / 1000);
      str = ","+reminder.toString();
      followers = str.concat(followers);
    }
    reminder = l % 1000;
    str = reminder.toString();
    followers = str.concat(followers);
    return followers;
  }

}
