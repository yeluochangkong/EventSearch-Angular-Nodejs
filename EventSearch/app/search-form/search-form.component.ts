import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AutoCompleteService } from '../service/auto-complete.service';
import { GetLocationService } from '../service/get-location.service';
import { PostEventService } from '../service/post-event.service';
import { Event } from '../object/event';
import { spaceValidator } from '../for-bidden.directive';
import { forbiddenNameValidator } from '../for-bidden.directive';
import { FlagControlService } from '../service/flag-control.service';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit {
  
  searchForm = this.formBuilder.group({
  keyword: new FormControl(null,[Validators.required,, spaceValidator()]),
  category: new FormControl("All"),
  radius: new FormControl(null,[forbiddenNameValidator(/^\d+$/)]),
  unit: new FormControl("Miles"),   
  inputLocation: new FormControl({value: null, disabled: true },[Validators.required, spaceValidator()]),
  lat: new FormControl(""),
  lng: new FormControl(""),
  chosedLocation: new FormControl("currentLocation")
  });
  isGetLocation = false;  // flag to get user's location
  isHasError = false;    // flag to handle error occured in request
  isVoidRecored = false; 
  isDisable = true;      // control the submit button
  timer: number = 10;     // variable for loading progress bar
  display = false;        // flag to display progress bar 
  options;               // autoComplete
  events: Event[];      // results of search
  isClear = false;  // should favorites (No records display)
  isParentDisplay = true;
  isEventDisplay = false;
  isFavDisplay = false;
  isDetailDisplay = false;
  favorites;
  constructor(private formBuilder: FormBuilder, private autoCompleteService : AutoCompleteService, private getLocationService: GetLocationService,
    private postEventService: PostEventService, private flagControlService: FlagControlService) {
  } 
  
  ngOnInit(): void {
    this.onChanges();
    this.getOptions();
    this.getLocation();  
    this.flagControlService.isParentDisplay.subscribe(is=>this.isParentDisplay = is);
    this.flagControlService.isEventDisplay.subscribe(is=>this.isEventDisplay = is);
    this.flagControlService.isFavDisplay.subscribe(is=>this.isFavDisplay = is);
    this.flagControlService.isDetailDisplay.subscribe(is=>this.isDetailDisplay = is);
    this.flagControlService.isClear.subscribe(is=>this.isClear = is);
    this.flagControlService.favorities.subscribe(fav=>this.favorites =fav)
  }
  

  isDisabled() {
    this.isDisable = this.searchForm.invalid || !this.isGetLocation;
    return this.isDisable;
  }
  getLocation (){
    let location;
    this.getLocationService.getLocation().subscribe(value => {
      location = value;
      if (location != null && location.latitude != null) {
        this.isGetLocation = true;
        this.searchForm.get('lat').setValue(location.latitude);
        this.searchForm.get('lng').setValue(location.longitude);
      }
      else {
        this.isGetLocation = false;
      }
    });
  }

  //autoComplete Function
  getOptions(){
    this.searchForm.get('keyword').valueChanges.subscribe(value => {
      if (this.searchForm.get('keyword').valid) {
        this.options = new Array();
        this.autoCompleteService.getOptions(value).subscribe(name =>{
          name.forEach((item)=>{
            this.options.push(item.name);
          });
        });
      }
      
    });
  }

  onChanges() {
    this.searchForm.get('chosedLocation').valueChanges
      .subscribe(chosedLocation => {
          if (chosedLocation != 'location') {
              this.searchForm.get('inputLocation').disable();
          }
          else {
              this.searchForm.get('inputLocation').enable();
          }
      });
  }
  onSubmit() {
    this.isHasError = false;
    this.isVoidRecored = false;
    this.flagControlService.changeParent(true);
    this.flagControlService.changeFav(false);
    this.flagControlService.changeDetail(false);
    this.flagControlService.changeEvent(true);
    this.flagControlService.changeClear(false);
    if (this.searchForm.get('chosedLocation').value == 'currentLocation') {
      this.events = null;
      this.getCurrentLocationEvents();
    }
     else {
       this.events = null;
      this.getInputLocationEvents();
     }
  }
  resultSwitch () {
    this.flagControlService.changeParent(true);
    this.flagControlService.changeEvent(true);
    this.flagControlService.changeFav(false);
    this.flagControlService.changeDetail(false);
  }
  FavoriteSwitch() {
    this.flagControlService.changeClear(false);
    this.flagControlService.changeDetail(false);
    this.flagControlService.changeParent(true);
    this.flagControlService.changeEvent(false);
    this.flagControlService.changeFav(true);
  }

 
getInit(){
  this.timer = 10;
  this.display = true;
}


async getInputLocationEvents  () {
  await this.getInit();
  let interval = setInterval(()=>{
    if (this.timer < 90) {
      this.timer += 20;
    }
  }, 100);
    let eventList;
    eventList = await this.postEventService.getInputLocationEvents(this.searchForm.value);
    eventList.subscribe((value)=>{
      if (value.length != 0) {
        this.events = new Array();
        value.forEach((event)=>{
        this.events.push(new Event(event.date, event.eventName, event.category, event.venueInfo, event.id, event.fav))
      })
      this.timer = 100;
      this.display = false;
      clearInterval(interval);
      }
      else {
        this.isVoidRecored = true;
        this.timer = 100;
        this.display = false;
        clearInterval(interval);
      }
    }, (err)=>{
      this.isHasError = true;
      this.timer = 100;
      this.display = false;
      clearInterval(interval);
    })
  } 


  async getCurrentLocationEvents () {
    await this.getInit();
    let interval = setInterval(()=>{
      if (this.timer < 90) {
        this.timer += 20;
      }
    }, 100);
      let eventList;
      eventList = await this.postEventService.getCurrentLocationEvents(this.searchForm.value);
      eventList.subscribe((value)=>{
        if (value.length != 0) {
          this.events = new Array();
          value.forEach((event)=>{
          this.events.push(new Event(event.date, event.eventName, event.category, event.venueInfo, event.id, event.fav))
        })
        this.timer = 100;
        this.display = false;
        clearInterval(interval);
        }
        else {
          this.isVoidRecored = true;
          this.timer = 100;
          this.display = false;
          clearInterval(interval);
        }
      }, (err)=>{
        this.isHasError = true;
        this.timer = 100;
        this.display = false;
        clearInterval(interval);
      })
    } 



  reset() {
    this.events = null;
    this.searchForm.reset({category: "All", unit: "Miles", chosedLocation: "currentLocation", lat: this.searchForm.get('lat').value, lng: this.searchForm.get('lng').value});
    this.isHasError = false;
    this.isVoidRecored = false;
    this.flagControlService.changeParent(false);
    this.flagControlService.changeFav(false);
    this.flagControlService.changeDetail(false);
    this.flagControlService.changeEvent(false);
    this.flagControlService.changeClear(true);
  }

  radio1Checked() {
    this.searchForm.get('inputLocation').disable();
  }
  radio2Checked () {
    this.searchForm.get('inputLocation').enable();
  }
}
