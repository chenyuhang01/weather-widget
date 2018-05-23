import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT, GOOGLE_GEO_API_KEY, GOOGLE_GEO_ROOT } from '../constants/constants';

import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WeatherService{ 


    
    constructor(private jsonp: Jsonp, private http: Http){ }

    getCurrentLocation() : Observable<any>{

        const url = GOOGLE_GEO_ROOT;
        const queryParmas = GOOGLE_GEO_API_KEY;

        return this.http.post(url + queryParmas, null).map(
            loc => 
            {
                return loc.json();
            }
        ).catch(
            err => 
            {
                return Observable.throw(err);
            }
        )

        //Use in localhost
        // if(navigator.geolocation){

        //     return new Observable(observer => {
        //         navigator.geolocation.getCurrentPosition(
        //         pos => {
        //             observer.next(pos);
        //         },
        //         err => {
        //             return Observable.throw("Error: " + err);
        //         })
        //     })
        // }else{
        //     return Observable.throw(new Error("Position geolocation is not available."));
        // }
    }

    getCurrentWeather(lat: number, long: number) : Observable<any>{
        const url = FORECAST_ROOT + FORECAST_KEY + '/' + lat + ',' + long;
        const queryParmas = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParmas)
                .map(data => {
                    ///Require return key word to return manipulated values
                    return data.json();
                })
                .catch(err => {
                    console.log("Cannot get the data information: ", err);
                    return Observable.throw(new Error(err));
                })
    }

    getLocationName(lat: number, long: number): Observable<any>{
        const url = GOOGLE_ROOT;
        const queryParmas = "?latlng=" + lat + "," + long + "&key=" + GOOGLE_KEY;
        
        return this.http.get(url + queryParmas).map(
            loc => 
            {
                return loc.json()
            }
        ).catch(
            err => {
                console.log("Unable to access GoogleApi");
                return Observable.throw(err);
            }
        );
    }

}