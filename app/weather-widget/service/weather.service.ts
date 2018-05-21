import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';

import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherService{ 

    constructor(private jsonp: Jsonp){ }

    getCurrentLocation() : [number, number]{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
            pos => {
                console.log("Position: ", pos.coords.latitude, " , ", pos.coords.longitude);
                return [ pos.coords.latitude, pos.coords.longitude];
            }, 
            err => {
                console.error("Error: ", err);
            })
        }else{
            console.error("Position geolocation is not available.");
            return [ 0,0 ];
        }
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
                    return Observable.throw(err.json());
                })
    }
}