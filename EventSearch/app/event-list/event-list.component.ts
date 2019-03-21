import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../object/event';
import { FormControl } from '@angular/forms';
import { GetEventDetailService } from '../service/get-event-detail.service';
import { EventDetail } from '../object/eventDetail';
import { Artist } from '../object/artist';
import { GetArtistService } from '../service/get-artist.service';
import { Venue } from '../object/venue';
import { UpComingEvent } from '../object/upComingEvent';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PhotoWithName } from '../object/photoWithName';
import { FlagControlService } from '../service/flag-control.service';
@Component({
  selector: 'app-event-list',
  animations: [
    trigger('displayHide',[
      state('display', style({
        transform: 'translateX(0)' ,
      })),
      state('hide', style({
        transform: 'translateX(-100%)',
      })),
      transition('display => hide', [
        animate('300ms ease-in-out')
      ]),
      transition('hide => display', [
        animate('300ms ease-in-out')
      ]),
    ],
    ),
    trigger('switch', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity:0}),
          animate('300ms ease-in-out', style({transform: 'translateX(0)', opacity:1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)',opacity:1}),
          animate('300ms ease-in-out', style({transform: 'translateX(-100%)',opacity:0}))
        ]),
    ]),
  ],
  
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})


export class EventListComponent implements OnInit {
  @Input() events: Event[];

  isParentDisplay:boolean;   
  isFavDisplay: boolean;
  isEventDisplay: boolean;  
  isDetailDisplay:boolean;
  eventDetailButton = new FormControl('');
  eventDetail: EventDetail;
  artists: Artist[];
  photo: PhotoWithName[];
  venue: Venue;
  upComingEvent: UpComingEvent[];
  detail = new FormControl({value:'', disabled: true});
  favs;
  favorities;
  currentEvent;  //clicked event's fav
  favDetailButton = new FormControl('');
  isClear: boolean;
  newEvents: Array<Object>;
  isVoidRecord = false;
  isHasError = false;
  copyEvent: UpComingEvent[];
  isBarDisplay = false;    // flag for whether the loading progress bar should display
  timer = 10;
  interval;

   
  constructor(private getEventDetailService: GetEventDetailService, private getArtistService: GetArtistService,private flagControlService: FlagControlService) { }
  
  ngOnInit() {
    this.getStarColor();
    this.flagControlService.isParentDisplay.subscribe(is=>this.isParentDisplay = is);
    this.flagControlService.isEventDisplay.subscribe(is=>this.isEventDisplay = is);
    this.flagControlService.isFavDisplay.subscribe(is=>this.isFavDisplay = is);
    this.flagControlService.isDetailDisplay.subscribe(is=>this.isDetailDisplay = is);
    this.flagControlService.isClear.subscribe(is=>this.isClear = is);
    this.flagControlService.favorities.subscribe(fav=> this.favorities=fav);
  }

  removeHighlight(event){
    event.target.style='';
  }
  backHighlight(event, id) {
    if(this.eventDetail != null && this.eventDetail.eventId == id) {
      event.target.style="background:rgb(249,224,167)";
    }
  }
  
  isdetailBtn() {
    return this.currentEvent == null;
  }
  backToDetail() {
    this.flagControlService.changeDetail(true);
    this.flagControlService.changeParent(false);
  }
  
  /********** get Event index in events array by event id************/
  getEventIndexById(id) : number{
    let n = this.events.length;
    let k = 0;
    while(k < n) {
      if (this.events[k].id == id) return k;
      k++;
    }
    return -1;
  }
  getStarColor() {
    if (this.events != null ) {
      let n = this.events.length;
      let k = 0;
      while (k < n) {
        let id = this.events[k].id;
        if(this.isInStorageById(id)) this.events[k].setStorage(true);
        else {
         this.events[k].setStorage(false);
        }
        k++;
      }
    }
  }
  isInStorageById(id) {
    let keys = Object.keys(localStorage);
    let n = keys.length;
    let j = 0;
    while(j < n) {
      let key = keys[j];
      if (key == id) {
        return true;
      }
      j++;
    }
    return false;
  } 
   
    childPutToFavCall(curPutEvent) {
    let item = JSON.parse(curPutEvent);
    let id = item.id;
    let isPut = item.isPut;
    let idInArr = this.getEventIndexById(id);
    if (isPut) {
      this.events[idInArr].setStorage(true);  
    }
    else {
      this.events[idInArr].setStorage(false);  
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

  putToStorange(event) {
    let obj =  event;
    let jsData = JSON.parse(obj);
    let clickId = jsData.id;
    if(this.isInStorageById(clickId)) {
      localStorage.removeItem(clickId);
      let eventId = this.getEventIndexById(clickId);
      this.events[eventId].setStorage(false);
      this.flagControlService.update();
      return;
    }
    let currentDate = new Date();
    let currentTime = currentDate.getTime();
    let newItem = {date: jsData.date, eventName: jsData.eventName, category:jsData.category, venueInfo:jsData.venueInfo,id:jsData.id, addTime:currentTime};
    localStorage.setItem(clickId, JSON.stringify(newItem));
    let curEvent = this.getEventIndexById(clickId);
    this.events[curEvent].isInStorage = true;
    this.flagControlService.update();
  }
  
  deleteFav(event) {
    let item = event;
    let jsItem = JSON.parse(item);
    let itemId = jsItem.id;
    localStorage.removeItem(itemId);
   if (this.events != null ) {
    let curEvent = this.getEventIndexById(itemId);
    if (this.events[curEvent] != null) 
    this.events[curEvent].isInStorage = false;
   } 
    this.flagControlService.update();
  }

// child to parent display
  display() {
    this.flagControlService.changeParent(true);
    this.flagControlService.changeEvent(true);
  }

  // componment : Progress Bar
  // function: init timer and isBarDisply
  // params: callback1: setInterval, callback2: start Fetch data from server
  getInit(callback1, callback2){
      this.timer = 10;
      this.isBarDisplay = true;
      let interval = callback1();
      callback2(interval);
  }
  
    // function: fetch data from server
    // triger: detail button is clicked
    // require: search eventId to fetch data
     getEventDetail(event) {
      this.flagControlService.changeParent(false);
      this.flagControlService.changeEvent(false);
    this.getInit(()=>{
      return setInterval(()=>{
        if (this.timer < 90) {
          this.timer += 20;
        }
        
      }, 100);
    }, (interval)=>{
    let  element = event.target.value;
    let jsElement = JSON.parse(element);
    this.currentEvent = jsElement;
    let id = jsElement.id;
     this.getEventDetailService.getEventDetail(id).subscribe(value => {
      this.eventDetail = value;
      let name = this.eventDetail.artist.split('|');
      if (this.eventDetail.category.toLowerCase().includes("music")) {
        this.getArtistService.getArtistsArray(name).then(value=>{
          this.artists = value;
        }
       );
      }
      //console.log("outer ************ artists's length ="+this.artists.length);
      /*********     getPhoto            *************/
      this.photo = new Array();
      name.forEach(item => {
        if (item != "") {
          this.getArtistService.getPhoto(item).subscribe(value => {
            this.photo.push(new PhotoWithName(item, value));
           
          })
        }
      })
      /**********       getVenue         ************/
      this.getArtistService.getVenue(this.eventDetail.venue).subscribe(value=>{
        this.venue = value;
      
      })

      /***********      getUpComingEvents ***********/
      this.getArtistService.getUpComingEvent(this.eventDetail.venue).subscribe(value => {
          this.upComingEvent = new Array();
          value.forEach((item => {
            this.upComingEvent.push(new UpComingEvent(item.displayName, item.uri, item.artist, item.time, item.type));
          }))
       
          this.getDefaultCopy();
      })
   
      clearInterval(interval);
      this.timer = 100;
      this.isBarDisplay = false;
     
      this.flagControlService.changeDetail(true);
    }); 

    }
    );
    
  }



  getDefaultCopy() {
    this.copyEvent = new Array();
    if (this.upComingEvent != null) {
      this.upComingEvent.forEach((item => {
      
        this.copyEvent.push(new UpComingEvent(item.displayName, item.uri, item.artist, item.time, item.type));
        }
        ));
    } 
    else {
     
    }
}
}
