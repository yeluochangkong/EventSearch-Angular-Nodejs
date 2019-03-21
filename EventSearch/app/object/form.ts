export class Form {
    keyword: string;
    category:string;
    radius:string;
    unit: string;
    inputLocation: string;
    lat:string;
    lng: string;
    constructor ( keyword,  category ,
         radius ,  unit ,
         inputLocation, lat, lng  ) {
             this.keyword = keyword;
             this.category = category;
             this.radius = radius;
             this.unit = unit;
             this.inputLocation = inputLocation;
              this.lat = lat;
              this.lng = lng; 
    }
}
