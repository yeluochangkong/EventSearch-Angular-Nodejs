import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { Event } from '../object/event';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostEventService {
  eventList;  
  constructor(private http: HttpClient) { 
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getInputLocationEvents(body): Promise<Observable<Event[]>>{
    const keyword = body.keyword? body.keyword:"";
    const category =body.category? body.category:"";
    const radius = body.radius? body.radius:"";
    const unit =body.unit? body.unit:"";
    const inputLocation =body.inputLocation? body.inputLocation:"";
    const data = new HttpParams().set('keyword',keyword).set('category',category).set('radius',radius)
     .set('unit',unit).set('inputLocation',inputLocation);
    // let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/event/inputLocationEvent/";
    let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/event/inputLocationEvent/";
    return new Promise<Observable<Event[]>>((resolve, reject) => {
    this.eventList = new Array();
    try {
        this.eventList = this.http.get<Event[]>(url, {params: data});
    }catch(error) {
      reject(error);
    }
      resolve(this.eventList);
  })
  }

   getCurrentLocationEvents(body): Promise<Observable<Event[]>>{ 
   const keyword = body.keyword? body.keyword:"";
   const category =body.category? body.category:"";
   const radius = body.radius? body.radius:"";
   const unit =body.unit? body.unit:"";
   const lat =body.lat? body.lat:"";
   const lng =body.lng? body.lng:"";
   const data = new HttpParams().set('keyword',keyword).set('category',category).set('radius',radius)
    .set('unit',unit).set('lat',lat).set('lng',lng);
  //  let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/event/currentLocationEvent/";
  
   let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/event/currentLocationEvent/";
   return new Promise<Observable<Event[]>>((resolve, reject) => {
    this.eventList = new Array();
    try{
      this.eventList = this.http.get<Event[]>(url, {params: data});
      resolve(this.eventList);
    }catch(err){
      return Observable.throw(err);
    }
  })
  }
}

//{[{keyword:body.keyword},{keyword:categoey.categoey},{radius: body.radius},{unit:body.unit},{lat:body.lat},{keylngword:body.lng}]}