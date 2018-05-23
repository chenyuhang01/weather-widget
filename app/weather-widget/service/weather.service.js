"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var constants_1 = require("../constants/constants");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var WeatherService = (function () {
    function WeatherService(jsonp, http) {
        this.jsonp = jsonp;
        this.http = http;
    }
    WeatherService.prototype.getCurrentLocation = function () {
        var url = constants_1.GOOGLE_GEO_ROOT;
        var queryParmas = constants_1.GOOGLE_GEO_API_KEY;
        return this.http.post(url + queryParmas, null).map(function (loc) {
            return loc.json();
        }).catch(function (err) {
            return Observable_1.Observable.throw(err);
        });
    };
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        var url = constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + '/' + lat + ',' + long;
        var queryParmas = "?callback=JSONP_CALLBACK";
        return this.jsonp.get(url + queryParmas)
            .map(function (data) {
            return data.json();
        })
            .catch(function (err) {
            console.log("Cannot get the data information: ", err);
            return Observable_1.Observable.throw(new Error(err));
        });
    };
    WeatherService.prototype.getLocationName = function (lat, long) {
        var url = constants_1.GOOGLE_ROOT;
        var queryParmas = "?latlng=" + lat + "," + long + "&key=" + constants_1.GOOGLE_KEY;
        return this.http.get(url + queryParmas).map(function (loc) {
            return loc.json();
        }).catch(function (err) {
            console.log("Unable to access GoogleApi");
            return Observable_1.Observable.throw(err);
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Jsonp, http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map