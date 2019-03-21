import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlagControlService {
  private parentDisplay = new BehaviorSubject(false);
  private eventDisplay = new BehaviorSubject(true);
  private favDisplay = new BehaviorSubject(false);
  private detailDisplay = new BehaviorSubject(false);
  private clear = new BehaviorSubject(false);
  private favs = new BehaviorSubject(new Array());
  isParentDisplay = this.parentDisplay.asObservable();
  isEventDisplay = this.eventDisplay.asObservable();
  isFavDisplay = this.favDisplay.asObservable();
  isDetailDisplay = this.detailDisplay.asObservable();
  isClear = this.clear.asObservable();
  favorities = this.favs.asObservable();
  constructor() { 
   this.update();
  }

  dynamicSort(key, order="asc"){
    return (a, b) => {
      const x = (typeof a[key] == 'string')? a[key].toUpperCase(): a[key];
      const y = (typeof b[key] == 'string')? b[key].toUpperCase(): b[key];
      let result = 0;
      if (x > y) result = 1;
      else if (x < y) result =-1;
      else result = 0;
     return  (order == "asc")? result: (-1 * result);
    }
  }
  update() {
    let keys = Object.keys(localStorage);
    let n = keys.length;
      let arr = new Array();
      if (n == 0) {
        this.favs.next(new Array());
      }
      else {
        while (n) {
          n--;
          let item = localStorage.getItem(keys[n]);
          if (item != null) {
          let data = JSON.parse(item);
          let fav = {date: data.date, eventName: data.eventName, category: data.category, venueInfo: data.venueInfo, id: data.id};
          let lfav = JSON.stringify(fav);
          let newEvent = {date: data.date, eventName: data.eventName, category: data.category, venueInfo: data.venueInfo, id: data.id, fav: lfav,addTime:data.addTime}
          arr.push(newEvent);
          }
        }
        arr.sort(this.dynamicSort('addTime','desc'));
        this.favs.next(arr);
        this.favorities.subscribe(value=>{
        })
      }
    }

   changeParent(isParent: boolean) {
    this.parentDisplay.next(isParent);
   }
   changeEvent(isEvent: boolean) {
    this.eventDisplay.next(isEvent);
   }
   changeFav(isFav: boolean) {
    this.favDisplay.next(isFav);
   }
   changeDetail(isDetail: boolean) {
    this.detailDisplay.next(isDetail);
   }
   changeClear(isClear: boolean) {
    this.clear.next(isClear);
   }

}
