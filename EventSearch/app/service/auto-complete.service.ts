import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Name } from '../object/name';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AutoCompleteService {
  // url = "http://yeluochangkong.us-east-2.elasticbeanstalk.com/auto/";
  constructor(private http: HttpClient) { 
    
  }
  getOptions(keyword: string): Observable<Name[]>{
    let test = this.http.get<Name[]>("http://yeluochangkong.us-east-2.elasticbeanstalk.com/auto/"+keyword);
    return test;
  }
}
