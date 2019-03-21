import { Component, OnInit,Input } from '@angular/core';
import { EventDetail } from '../object/eventDetail';
import { Artist } from '../object/artist';
import { Venue } from '../object/venue';
import { UpComingEvent } from '../object/upComingEvent';
import { FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { FlagControlService } from '../service/flag-control.service';
@Component({
  selector: 'app-detail-tabs',
  animations: [
    trigger('displayHide',[
      state('display', style({
        display: 'block'
      })),
      state('hide', style({
        display: 'none'
      })),
      transition('display => hide', [
        animate('800ms ease-in-out')
      ]),
      transition('hide => display', [
        animate('800ms ease-in-out')
      ]),
    ],

    ),
    
    trigger('fadeIn', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ],{ optional: true }),
        query(':leave', [
          stagger(-100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 0, height: 0, transform: 'translateY(-50px)' }))
          ])
        ],{ optional: true }),
      ])
  ]),
  
  
  ],
  templateUrl: './detail-tabs.component.html',
  styleUrls: ['./detail-tabs.component.css']
})

export class DetailTabsComponent implements OnInit {
  @Input() eventDetail: EventDetail;
  @Input() artists: Artist[];
  @Input() photo:[];
  @Input() venue: Venue;
  @Input() upComingEvent: UpComingEvent[];
  @Input() copyEvent:  UpComingEvent[];
  @Input() currentEvent;  // event's fav
  isParentDisplay: boolean;
  isEventDisplay: boolean;
  isFavDisplay: boolean;
  isDetailDisplay: boolean;
  isClear: boolean;
  cate = new FormControl('Default');
  order = new FormControl({value:'Ascending', disabled: true}, );
  cates = [{value: "Default"},{value: "Event Name"},{value: "Time"},{value: "Artist"},{value: "Type"}];
  twitterText;
  numsToShow = 5;
  isHidden = true;
  favorites; 
  tabs = [true, false, false, false];
  constructor(private flagControlService: FlagControlService) {
   
   }
  
  ngOnInit() {
    this.sort();
    this.cateChange();
    this.getTwitterText();
    this.tabs = [true, false, false, false];
    this.flagControlService.isParentDisplay.subscribe(is=>this.isParentDisplay = is);
    this.flagControlService.isEventDisplay.subscribe(is=>this.isEventDisplay = is);
    this.flagControlService.isFavDisplay.subscribe(is=>this.isFavDisplay = is);
    this.flagControlService.isDetailDisplay.subscribe(is=>this.isDetailDisplay=is);
    this.flagControlService.isClear.subscribe(is=>this.isClear = is);
    this.flagControlService.favorities.subscribe(fav=>this.favorites=fav);
  }
  
   setShowTab(index) {
    this.tabs = [false, false, false, false];
    this.tabs[index] = true;
  }
  //used for sorting by default, copy the default order
  copyDefaultOrder() {
    if (this.upComingEvent != null) {
      let n = this.upComingEvent.length;
      for (let i = 0; i < n ; i++) {
        this.upComingEvent[i].setDisplayName(this.copyEvent[i].displayName); 
        this.upComingEvent[i].setArtist(this.copyEvent[i].artist); 
        this.upComingEvent[i].setTime(this.copyEvent[i].time); 
        this.upComingEvent[i].setType(this.copyEvent[i].type); 
        this.upComingEvent[i].setUri(this.copyEvent[i].uri); 
      }
    } 
 
}
  isHasStar():boolean {
    let id =  this.currentEvent.id;
    let item = localStorage.getItem(id);
    if (item == null) return false;
    else return true;
  }

 
  showMore() {
    this.isHidden = false; 
    this.numsToShow = this.upComingEvent.length;
  }
  showLess() {
    this.isHidden = true;
    this.numsToShow = 5;
  }
  getTwitterText() {
    if (this.eventDetail != null)
    this.twitterText = "Check out " + this.eventDetail.artist + " located at"+this.eventDetail.venue + ". Website:"+this.eventDetail.buyTicketAt;
  }
  hide () {
    this.flagControlService.changeParent(true);
    this.flagControlService.changeEvent(true);
    this.flagControlService.changeDetail(false);
    this.flagControlService.changeFav(false);
  
  }

putToFav() {
    let jsData = this.currentEvent;
    let id =   this.currentEvent.id;
    let j = 0;
    let item = localStorage.getItem(id);
    if (item == null) {
      let currentDate = new Date();
      let currentTime = currentDate.getTime();
      let newItem = {date: jsData.date, eventName: jsData.eventName, category:jsData.category, venueInfo:jsData.venueInfo,id:jsData.id, addTime:currentTime};
      localStorage.setItem(id, JSON.stringify(newItem));
      this.flagControlService.update();
    }
    else {
        localStorage.removeItem(id);
        this.flagControlService.update();
    }
}
  
  cateChange () {
   this.cate.valueChanges.subscribe(value => {
     if (value == "Default") {
      this.order.disable();
     } 
     else this.order.enable();
     
   })
  }
  sort () {
    this.cate.valueChanges.subscribe( value =>{
      this.getSort();
    });
    this.order.valueChanges.subscribe(() => this.getSort());
  }
  getSort() {
    let cate = this.cate.value;
    let order = this.order.value;
    if (order == "Ascending") {
      if (cate == "Name" ) {
        this.upComingEvent.sort(this.dynamicSort('displayName', 'asc'));
      }
      else if (cate == "Time") {
        this.upComingEvent.sort(this.dynamicSort('time', 'asc'));
      }
      else if (cate == "Artist") {
        this.upComingEvent.sort(this.dynamicSort('artist', 'asc'));
      }
      else if (cate == "Type"){
        this.upComingEvent.sort(this.dynamicSort('type', 'asc'));
      }
      else {
        this.copyDefaultOrder();
      }
    }
    else {
      if (cate == "Name" ) {
        this.upComingEvent.sort(this.dynamicSort('displayName', 'desc'));
      }
      else if (cate == "Time") {
        this.upComingEvent.sort(this.dynamicSort('time', 'desc'));
      }
      else if (cate == "Artist") {
        this.upComingEvent.sort(this.dynamicSort('artist', 'desc'));
      }
      else if (cate == "Type"){
        this.upComingEvent.sort(this.dynamicSort('type', 'desc'));
      }
      else {
        this.copyDefaultOrder();
      }
    }
    
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
  
}
