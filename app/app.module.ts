import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { JsonpModule } from '@angular/http';

import { WeatherComponent } from './weather-widget/component/weather.component';
import { WeatherService } from './weather-widget/service/weather.service';


@NgModule({
    imports: [ BrowserModule, JsonpModule ],
    declarations: [ AppComponent, WeatherComponent ],
    bootstrap: [ AppComponent ],
    providers: [ WeatherService ]
})
export class AppModule{ }