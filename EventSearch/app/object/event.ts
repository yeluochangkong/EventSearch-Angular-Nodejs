export class Event {
    date: string;
    eventName: string;
    category: string;
    venueInfo:string;
    id: string;
    fav: string;   // date+eventName+category+venueInfo+id
    isInStorage = false; //decide whether the event is in localStroage, so to decide which star button shoule be light
   
    
    constructor (date, eventName, category, venueInfo, id, fav) {
        this.date = date;
        this.eventName = eventName;
        this.category = category;
        this.venueInfo = venueInfo;
        this.id = id;
        this.fav = fav;
       // this.addTime = addTime;
    }
    setStorage = function (value: boolean) {
        this.isInStorage = value;
    }
}