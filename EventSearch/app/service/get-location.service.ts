import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../object/location';
@Injectable({
  providedIn: 'root'
})

export class GetLocationService {
  constructor(private http: HttpClient) { }
  getLocation () {
     return this.http.get<Location>('https://ipapi.co/json/');
  }
}
