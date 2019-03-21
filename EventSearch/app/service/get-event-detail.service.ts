import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDetail} from '../object/eventDetail';

@Injectable({
  providedIn: 'root'
})
export class GetEventDetailService {

  constructor(private http: HttpClient) { 
  }
  getEventDetail(id): Observable<EventDetail>{    
    return this.http.get<EventDetail>("http://yeluochangkong.us-east-2.elasticbeanstalk.com/eventDetail/"+id);
  }
}
