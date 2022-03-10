import { EventEmitter, Injectable, Output } from '@angular/core';
import { GeoData, WeatherData } from './open-weather-map.service';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  defaultLocation: GeoData = {
    name: "Lund",
    country: "Sweden",
    lat: 55.703889,
    lon: 13.195,
  };
  displayedLocation: GeoData;

  locationCache: Map<string, GeoData> = new Map();

  locationUpdated: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.displayedLocation = this.defaultLocation;
  }

  setDisplayedLocation(data: GeoData) {
    this.displayedLocation = data;
    this.locationUpdated.emit();
  }

  getDisplayedLocation(): GeoData {
    return this.displayedLocation;
  }
}
