import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../object/artist';
import { Observable } from 'rxjs';
import { Photo } from '../object/photo';
import { Venue } from '../object/venue';
import { UpComingEvent } from '../object/upComingEvent';
@Injectable({
  providedIn: 'root'
})
export class GetArtistService  {

  constructor(private http: HttpClient) { 
  }
  getArtist(name): Observable<Artist> {
    // let url  = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/artist/"+name;
    let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/artist/"+name;
    return this.http.get<Artist>(url);
  }

  getPhoto(expression): Observable<Photo[]>{
    // let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/photo/"+expression;
    let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/photo/"+expression;
    return this.http.get<Photo[]>(url);
  }
  getVenue(venueName): Observable<Venue> {
    // let url  = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/venue/"+venueName;
    let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/venue/"+venueName;
    return this.http.get<Venue>(url);
  }
  getUpComingEvent(venue): Observable<UpComingEvent[]> {
    // let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/up/"+venue;
    let url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/up/"+venue;
    return this.http.get<UpComingEvent[]>(url);
  }


  //getArtistsArray(name: string[]) 
  getArtistsArray(name: string[]): Promise<Artist[]>{
    return new Promise((resolve, reject) => {
      let result = new Array<Artist>();
      name.forEach(item => {
        this.getArtist(item).subscribe(value => {
          if (value != null)
          result.push(value);
        })
      })
      resolve(result);
      reject("error when fetch music artists");
    })
  }

}
