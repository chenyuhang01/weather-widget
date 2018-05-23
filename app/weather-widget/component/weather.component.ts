import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})
export class WeatherComponent implements OnInit {

    private weatherData: Weather = new Weather(null, null, null, null, null);
    private pos: any;
    private currentLocation: string = null;

    private currentSpeedUnit = "kph";
    private currentTempUnit = "celsius";
    
    private icons = new Skycons();

    private dataReceived : boolean = false;

    constructor(private service: WeatherService) { }

    //Implementation
    ngOnInit() {
        this.getCurrentLocation();
        
    }

    getCurrentLocation() {
        this.service.getCurrentLocation().subscribe(
            (pos) => {
                this.pos = pos;
                this.getCurrentWeather();
                this.getLocationName();
                
            });
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos['location']['lat'], this.pos['location']['lng']).subscribe(
            (weather) => {
                
                this.weatherData.temp = weather["currently"]["temperature"];
                this.weatherData.summary = weather["currently"]["summary"];
                this.weatherData.wind = weather["currently"]["windSpeed"];
                this.weatherData.humidity = weather["currently"]["humidity"];
                this.weatherData.icon = weather["currently"]["icon"];
                this.setIcon();
                this.dataReceived = true;
            },
            (err) => {
                console.log("Error: ", err);
            });
    }

    getLocationName(){
        this.service.getLocationName(this.pos['location']['lat'], this.pos['location']['lng']).subscribe( 
            location => 
            {
                this.currentLocation = location['results'][2]['formatted_address'];
                console.log(this.currentLocation);
            }
        )
    }

    toggleUnits(){
        this.toggleSpeedUnits();
        this.toggleTempUnits();
    }

    toggleTempUnits(){
        if(this.currentTempUnit == "celsius"){
            this.currentTempUnit = "frad";
        }else{
            this.currentTempUnit = "celsius";
        }
    }

    toggleSpeedUnits(){
        if(this.currentSpeedUnit == "kph"){
            this.currentSpeedUnit = "mph";
        }else{
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon(){
        this.icons.add('icon', this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): object{
        
        if(this.weatherData.icon){
            const iconString : any = this.weatherData.icon;
            this.icons.color = (<any>WEATHER_COLORS)[this.weatherData.icon]['color'];

            return (<any>WEATHER_COLORS)[this.weatherData.icon];
        }else{
            this.icons.color = WEATHER_COLORS['default']['color'];
            return WEATHER_COLORS["default"];
        }
    }
} 